import React from 'react';
import '../../styles/UploadSpinner.css';

const UploadSpinner = () => (
  <div className="spinner-overlay">
    <div className="spinner"></div>
    <p>Uploading document...</p>
  </div>
);

export default UploadSpinner;