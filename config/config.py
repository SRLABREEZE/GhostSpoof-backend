import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
    DEBUG = os.getenv("DEBUG", False)
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///ghostspoof.db")
