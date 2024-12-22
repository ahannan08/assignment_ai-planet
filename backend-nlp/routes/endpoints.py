from fastapi import APIRouter, File, UploadFile, HTTPException, Body, Depends
from .nlp_logic import process_pdf, answer_question
from sqlalchemy.orm import Session  # Import Session from sqlalchemy.orm
from .database import get_db
import uuid

router = APIRouter()

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDFs are allowed.")
    
    content = await file.read()
    try:
        document_id = str(uuid.uuid4())  # Generate unique ID for the document
        process_pdf(content, document_id, db)
        return {"message": "PDF uploaded successfully.", "document_id": document_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")

@router.post("/ask")
async def ask_question(
    document_id: str = Body(..., embed=True),
    question: str = Body(..., embed=True)
):
    try:
        answer = answer_question(document_id, question)
        return {"question": question, "answer": answer}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing question: {str(e)}")
