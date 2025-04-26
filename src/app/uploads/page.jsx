"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleFileSelect = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setError('');
    
    try {
      // Step 1: Get presigned URL from backend
      const { data } = await axios.post('http://localhost:5005/api/v1/uploads/generate-presigned-url', {
        fileName: selectedFile.name,
        fileType: selectedFile.type
      });

      // Step 2: Upload file directly to Digital Ocean Space using presigned URL
      const result = await axios.put(data.url, selectedFile, {
        headers: {
          'Content-Type': selectedFile.type
        }
      });

      // Get the public URL of the uploaded file
      const spaceUrl = `https://${process.env.REACT_APP_SPACE_NAME}.${process.env.REACT_APP_REGION}.digitaloceanspaces.com/${new URL(data.url).pathname.split('/').slice(2).join('/')}`;
      setUploadedUrl(spaceUrl);
    } catch (err) {
      setError('Upload failed. Please try again.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleUpload} disabled={!selectedFile || isUploading}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {uploadedUrl && (
        <div>
          <p>Upload successful!</p>
          <img src={uploadedUrl} alt="Uploaded" style={{ maxWidth: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;