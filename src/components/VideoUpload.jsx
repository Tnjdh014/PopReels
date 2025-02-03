import React, { useState } from 'react';
import axios from 'axios';

const VideoUpload = () => {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('video', file);
    formData.append('caption', caption);

    const res = await axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(res.data);
  };

  return (
    <div className="box">
      <h2 className="title is-4">Upload a Video</h2>
      <div className="field">
        <label className="label">Caption</label>
        <div className="control">
          <input
            type="text"
            placeholder="Enter a caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Video File</label>
        <div className="control">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="input"
          />
        </div>
      </div>
      <button onClick={handleUpload} className="button is-primary">
        Upload
      </button>
    </div>
  );
};

export default VideoUpload;