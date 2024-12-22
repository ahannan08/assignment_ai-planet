from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import validates
from .database import Base
import datetime

class Document(Base):
    __tablename__ = 'documents'

    id = Column(Integer, primary_key=True, autoincrement=True)
    filename = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    upload_date = Column(DateTime, default=datetime.datetime.utcnow)

    @validates('filename')
    def validate_filename(self, key, value):
        if len(value) < 1:
            raise ValueError("Filename cannot be empty")
        return value

    @validates('file_path')
    def validate_file_path(self, key, value):
        if len(value) < 1:
            raise ValueError("File path cannot be empty")
        return value
