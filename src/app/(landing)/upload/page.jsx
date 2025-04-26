"use client"

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files)); // Convert FileList to array
  };

  const handleUpload = async () => {
    if (files.length === 0) return alert('Please select at least one file');

    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file); // Match backend field name
    });

    try {
      const res = await axios.post('http://localhost:5005/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setImageUrls(res.data.urls); // Array of URLs
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed');
    }
  };

  return (
    <div className='py-64 min-h-screen flex flex-col items-center justify-center bg-red-50' style={{ padding: '20px' }}>
      <h1>Upload Images to DigitalOcean</h1>
      <input
        type="file"
        accept="image/*"
        multiple // Allow multiple files
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload</button>
      {imageUrls.length > 0 && (
        <div>
          <h2>Uploaded Images:</h2>
          {imageUrls.map((url, index) => (
            <div key={index}>
              <p>
                Image {index + 1}: <a href={url} target="_blank">{url}</a>
              </p>
              <img src={url} alt={`Uploaded ${index}`} style={{ maxWidth: '300px' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}