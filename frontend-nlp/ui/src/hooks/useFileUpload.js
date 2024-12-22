// hooks/useFileUpload.js
import { useState } from "react";
import { uploadPDF } from "../api/api";

const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [documentId, setDocumentId] = useState("");
  const [error, setError] = useState("");

  const handleFileUpload = async (file) => {
    setUploading(true);
    setError("");
    try {
      const data = await uploadPDF(file);
      setDocumentId(data.document_id);
    } catch (err) {
      setError(err.message || "Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    documentId,
    error,
    handleFileUpload,
  };
};

export default useFileUpload;
