

# Video Sharing App, Welcome to PopReels!

A full-stack web application where users can upload, view, like, and comment on short-form videos. Built with React (frontend), Node.js + Express (backend), and SQLite (database).

---

## Features
- **User Authentication**: Register and log in to upload videos.
- **Video Upload**: Upload short videos with captions.
- **Video Feed**: View videos uploaded by other users.
- **Like and Comment**: Like and comment on videos (to be implemented).
- **Responsive Design**: Built with Bulma CSS for a clean and modern UI.

---

## Tech Stack
- **Frontend**: React (Vite), Bulma CSS
- **Backend**: Node.js, Express, SQLite
- **File Storage**: Local storage for videos
- **Authentication**: JWT (JSON Web Tokens)

---

## How to Run the Project

### Prerequisites
1. **Node.js**: Install from [nodejs.org](https://nodejs.org/).
2. **Git**: Install from [git-scm.com](https://git-scm.com/).

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/video-app.git
cd video-app
```

---

### Step 2: Set Up the Backend
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create the required folders:
   ```bash
   mkdir public videos
   ```
4. Start the backend server:
   ```bash
   node index.js
   ```
   The backend will run on `http://localhost:5000`.

---

### Step 3: Set Up the Frontend
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5174`.

---

### Step 4: Access the App
1. Open your browser and go to `http://localhost:5174`.
2. Register a new account or log in with existing credentials.
3. Upload videos and explore the feed!

---

## Project Structure
```
video-app/
├── backend/
│   ├── index.js           # Backend server
│   ├── database.db        # SQLite database
│   ├── videos/            # Folder for uploaded videos
│   └── public/            # Folder for static files
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── index.html         # HTML template
└── README.md              # This file
```

---

## Troubleshooting
1. **Port 5000 Already in Use**:
   - Kill the process using port 5000:
     ```bash
     netstat -ano | findstr :5000
     taskkill /PID <PID> /F
     ```
   - Or change the port in `backend/index.js`:
     ```javascript
     const PORT = 5001;
     ```

2. **CSP Errors**:
   - Ensure the CSP headers in `backend/index.js` are correctly configured.

3. **404 Errors for Videos**:
   - Verify the `videos` folder exists in the `backend` directory.

---

## Future Improvements
- Add like and comment functionality.
- Implement user profiles.
- Use cloud storage (e.g., AWS S3) for video uploads.
- Deploy the app to a hosting platform (e.g., Vercel, Render).

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
