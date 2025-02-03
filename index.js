const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your_secret_key';

// ========== Fix 1: Set CSP headers FIRST ==========
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self';" +
    "font-src 'self' https://fonts.gstatic.com;" +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;" +
    "img-src 'self' data:;" +
    "script-src 'self' 'unsafe-eval';" +
    "connect-src 'self' http://localhost:5000 http://localhost:5174" // Add frontend port
  );
  next();
});

app.use(cors());
app.use(express.json());

// ========== Fix 2: Serve static files AFTER CSP ==========
app.use(express.static(path.join(__dirname, 'public')));
app.use('/videos', express.static(path.join(__dirname, 'videos'))); 

// ... rest of your code (database setup, routes, etc.) remains unchanged ...
const db = new sqlite3.Database('./database.db');

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      caption TEXT,
      video_url TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      video_id INTEGER,
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(video_id) REFERENCES videos(id)
    )
  `);
});

// Multer setup for video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './videos');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Auth middleware
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Routes
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function (err) {
    if (err) return res.status(400).json({ message: 'User already exists' });
    res.json({ id: this.lastID });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err || !user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY);
    res.json({ token });
  });
});

app.post('/upload', authenticate, upload.single('video'), (req, res) => {
  const { caption } = req.body;
  const videoUrl = `/videos/${req.file.filename}`;
  db.run('INSERT INTO videos (user_id, caption, video_url) VALUES (?, ?, ?)', [req.user.id, caption, videoUrl], function (err) {
    if (err) return res.status(500).json({ message: 'Upload failed' });
    res.json({ id: this.lastID, videoUrl });
  });
});

app.get('/feed', authenticate, (req, res) => {
  db.all('SELECT * FROM videos', (err, videos) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch videos' });
    res.json(videos);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});