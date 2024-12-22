from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, DateTime
from sqlalchemy.sql import func

DATABASE_URL='postgresql+psycopg2://intern:planent@localhost:5432/ai_planet'

# Initialize database connection
engine = create_engine(DATABASE_URL)
metadata = MetaData()

# Define the 'documents' table
documents_table = Table(
    "documents",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("filename", String, nullable=False),
    Column("file_path", String, nullable=False),
    Column("upload_date", DateTime, server_default=func.now()),
)

# Create tables
def run_migration():
    metadata.create_all(engine)
    print("Migration completed: 'documents' table created.")

if __name__ == "__main__":
    run_migration()
