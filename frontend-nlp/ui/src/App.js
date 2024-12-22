import React, { useState } from "react";
import Navbar from "./components/Navbar";
import FileUpload from "./components/FileUpload";
import NameModal from "./components/utils/NameModal";
import Main from "./Main";
import useFileUpload from "./hooks/useFileUpload";

const App = () => {
  const [userName, setUserName] = useState("");
  const { uploading, documentId, error, handleFileUpload } = useFileUpload();

  const handleNameSubmit = (name) => {
    setUserName(name);
  };

  if (!userName) {
    return <NameModal onNameSubmit={handleNameSubmit} />;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <Navbar>
        <FileUpload onFileUpload={handleFileUpload} />
      </Navbar>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Main userName={userName} documentId={documentId} uploading={uploading} />
    </div>
  );
};

export default App;
