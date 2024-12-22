import React from "react";
import QuestionContainer from "./components/QuestionContainer";
import AnswerDisplay from "./components/AnswerDisplay";
import UploadSpinner from "./components/utils/UploadSpinner"; // Import the spinner
import useQuestionSubmit from "./hooks/useQuestionSubmit";

const Main = ({ userName, documentId, uploading }) => {
  const { loading, qnaHistory, error, handleQuestionSubmit } = useQuestionSubmit(documentId);

  // Show spinner when uploading
  if (uploading) {
    return <UploadSpinner />;
  }

  return (
    <div>
      {documentId ? (
        <>
          <QuestionContainer onSubmit={handleQuestionSubmit} />
          <div>
            {qnaHistory.map((item, index) => (
              <AnswerDisplay
                key={index}
                question={item.question}
                answer={item.answer}
                loading={loading && index === 0}
                userName={userName}
                isNew={item.isNew}
              />
            ))}
          </div>
        </>
      ) : (
        <p>Please upload a file to start.</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Main;
