import React, { useState } from 'react';
import VideoUpload from './components/VideoUpload';
import VideoFeed from './components/VideoFeed';
import Explore from './components/Explore';

const App = () => {
  const [activeView, setActiveView] = useState('feed'); // Default to Feed

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <h1 className="title has-text-white">PopReels</h1>
          </a>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button
                  onClick={() => setActiveView('feed')}
                  className={`button ${activeView === 'feed' ? 'is-info' : 'is-light'}`}
                >
                  Feed
                </button>
                <button
                  onClick={() => setActiveView('explore')}
                  className={`button ${activeView === 'explore' ? 'is-info' : 'is-light'}`}
                >
                  Explore
                </button>
                <button
                  onClick={() => setActiveView('upload')}
                  className={`button ${activeView === 'upload' ? 'is-info' : 'is-light'}`}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Conditional rendering of components */}
      <section className="section">
        <div className="container">
          {activeView === 'feed' && <VideoFeed />}
          {activeView === 'explore' && <Explore />}
          {activeView === 'upload' && <VideoUpload />}
        </div>
      </section>
    </div>
  );
};

export default App;
