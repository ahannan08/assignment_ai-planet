import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const uploadPDF = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Error uploading PDF");
  }
};

export const askQuestion = async (documentId, question) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ask`, { document_id: documentId, question });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Error fetching answer");
  }
};
