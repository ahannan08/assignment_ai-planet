import React from "react";

const FileUpload = ({ onFileUpload }) => {
  const handleChange = (e) => {
    if (onFileUpload) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
    </div>
  );
};

export default FileUpload;
