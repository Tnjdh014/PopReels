import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoFeed = () => {
  const [videos, setVideos] = useState([]);

  // Fetch videos from backend when component mounts
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/feed');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="box">
      <h2 className="title is-4">Video Feed</h2>
      <div className="video-list">
        {videos.length === 0 ? (
          <p>No videos found. Upload one to get started!</p>
        ) : (
          videos.map((video) => (
            <div key={video.id} className="card mb-4">
              <div className="card-content">
                <video 
                  src={`http://localhost:5000${video.video_url}`} 
                  controls 
                  className="video-player"
                  style={{ width: '100%', maxWidth: '600px' }}
                />
                <div className="content mt-3">
                  <p className="subtitle is-6">{video.caption}</p>
                  <div className="tags has-addons">
                    <span className="tag is-info">
                      Uploaded by User #{video.user_id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VideoFeed;