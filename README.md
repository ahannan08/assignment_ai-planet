The PDF Q&A API allows users to upload PDF files, process them for text extraction, and store them in a vectorized format for later question answering. Using this API, users can upload PDFs, extract and store their contents, and ask questions related to the document.


API Endpoints
1. Upload PDF
    • Endpoint: /api/upload
    • Method: POST
    • Description: Upload a PDF file to be processed and stored for question answering.
    • Request:
        ○ Body: A file (PDF format only) to be uploaded.
    • Response:
        ○ Success: {"message": "PDF uploaded successfully.", "document_id": "<document_id>"}
        ○ Failure: {"detail": "<error_message>"}
    • Notes: The PDF file is extracted, split into chunks, and saved in a vectorized format for later querying.
2. Ask Question
    • Endpoint: /api/ask
    • Method: POST
    • Description: Ask a question related to an uploaded PDF document.
    • Request:
        ○ Body:
            § document_id (string): The ID of the uploaded document.
            § question (string): The question to be asked.
    • Response:
        ○ Success: {"question": "<question>", "answer": "<answer>"}
        ○ Failure: {"detail": "<error_message>"}
    • Notes: The question is answered by retrieving relevant chunks from the stored vectorized document.



How It Works
    1. Upload PDF:
        ○ The /upload endpoint accepts a PDF file, extracts text from it, and splits the text into chunks for processing.
        ○ It stores the vector representation of the document in a FAISS index, which is a fast similarity search engine.
    2. Question Answering:
        ○ The /ask endpoint allows users to ask questions based on the content of an uploaded PDF document.
        ○ The system retrieves relevant chunks of text from the document and uses OpenAI's GPT-3.5 to generate an answer.


Setup and Configuration
Environment Variables
    • DATABASE_URL: The URL of the database (for storing document metadata).
    • OPENAI_API_KEY: API key for accessing OpenAI services (for generating answers to questions).
Dependencies
    • FastAPI for the API framework.
    • SQLAlchemy for database interactions.
    • PyPDF2 for PDF text extraction.
    • Langchain for document processing and question answering.
Database Setup
Ensure that you have the correct database setup. The application requires a SQL database to store document metadata.


Example Postman Request Details
Upload PDF Request:
    • URL: http://localhost:8000/api/upload
    • Method: POST
    • Body: form-data
        ○ Key: file (type: File)
        ○ Value: Select a PDF file from your computer.
Ask Question Request:
    • URL: http://localhost:8000/api/ask
    • Method: POST
    • Body: raw JSON

json
Copy code
{"document_id":"12345-abcde",
    • "question":"What is the document about?"}


Error Handling
    • 400 Bad Request: Invalid file format or missing data.
    • 404 Not Found: Document ID not found when asking a question.
    • 500 Internal Server Error: Unexpected server errors (e.g., issues with PDF processing or question answering).


