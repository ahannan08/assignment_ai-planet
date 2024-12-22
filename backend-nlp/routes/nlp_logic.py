import io
import os
from typing import Dict
from PyPDF2 import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from .models import Document

# Initialize OpenAI API key
load_dotenv()
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

# Store for document vectors
documents_store: Dict[str, FAISS] = {}

def extract_text_from_pdf(pdf_content: bytes) -> str:
    """Extract text from a PDF document."""
    pdf_file = io.BytesIO(pdf_content)
    reader = PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def process_pdf(file_content: bytes, document_id: str, db: Session):
    """Process PDF content and store its vector representation."""
    # Extract text from PDF
    text = extract_text_from_pdf(file_content)
    
    # Split text into chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    texts = text_splitter.split_text(text)
    
    # Create embeddings and store in FAISS
    embeddings = OpenAIEmbeddings()
    vector_store = FAISS.from_texts(texts, embeddings)
    
    # Store the vector store with the document ID
    documents_store[document_id] = vector_store

    # Save the document details to the database
    save_document_to_db(document_id, db)

def save_document_to_db(document_id: str, db: Session):
    """Save document details to the database."""
    # Generate file path (assuming file is saved locally for simplicity)
    file_path = f"uploads/{document_id}.pdf"
    document = Document(filename=f"{document_id}.pdf", file_path=file_path)
    db.add(document)
    db.commit()

def answer_question(document_id: str, question: str) -> str:
    """Generate answer for a question using the stored document."""
    if document_id not in documents_store:
        raise ValueError("Document ID not found")
    
    # Initialize OpenAI chat model
    llm = ChatOpenAI(
        model_name="gpt-3.5-turbo",
        temperature=0
    )
    
    # Create retrieval QA chain
    vector_store = documents_store[document_id]
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vector_store.as_retriever(
            search_kwargs={"k": 3}
        )
    )
    
    # Get answer
    try:
        answer = qa_chain.run(question)
        return answer
    except Exception as e:
        raise Exception(f"Error generating answer: {str(e)}")
