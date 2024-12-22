from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.endpoints import router

app = FastAPI()

# Allow CORS for specific origins
origins = [
    "http://localhost:3001",  # Add your frontend's origin here
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all HTTP headers
)

@app.get("/")
async def root():
    return {"message": "Welcome to the PDF Q&A API"}

# Include the router with the API endpoints
app.include_router(router, prefix="/api")
