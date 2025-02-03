import React from 'react';

const Explore = () => {
  // Hardcoded videos stored in backend/videos
  const videos = [
    { id: 1, title: "Amazing Skate Tricks", url: "backend\videos\Download (3).mp4" },
    { id: 2, title: "Funny Cat Compilation", url: "/backend/videos/cats.mp4" },
    { id: 3, title: "Travel Vlog: Japan", url: "/backend/videos/japan.mp4" },
  ];

  return (
    <div>
      <h2 className="title">Explore Videos</h2>
      <div className="columns is-multiline">
        {videos.map((video) => (
          <div key={video.id} className="column is-one-third">
            <div className="card">
              <div className="card-image">
                <video controls width="100%">
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="card-content">
                <p className="title is-5">{video.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
