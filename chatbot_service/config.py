from pydantic_settings import BaseSettings
from pathlib import Path


class Settings(BaseSettings):
    pinecone_api_key: str
    pinecone_index_name: str = "girlsleadingtech-rag"
    pinecone_cloud: str = "aws"
    pinecone_region: str = "us-east-1"

    embedding_model: str = "all-MiniLM-L6-v2"
    embedding_dimension: int = 384

    chunk_size: int = 512
    chunk_overlap: int = 64

    upload_dir: str = "uploads"

    # LLM Settings
    gemini_api_key: str | None = None
    groq_api_key: str | None = None
    gemini_model: str = "gemini-2.5-flash"
    groq_model: str = "llama-3.1-8b-instant"  # default llama-3.3-70b or llama3-8b-8192

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()

BASE_DIR = Path(__file__).parent
UPLOAD_PATH = BASE_DIR / settings.upload_dir
