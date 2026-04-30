import os
from pathlib import Path
from pydantic import BaseSettings, Field, AnyUrl

class Settings(BaseSettings):
    # FastAPI host/port
    HOST: str = Field(default="0.0.0.0")
    PORT: int = Field(default=8000)

    # OpenAI / Ollama
    OPENAI_API_KEY: str = Field(default="", env="OPENAI_API_KEY")
    OLLAMA_BASE_URL: AnyUrl | None = Field(default=None, env="OLLAMA_BASE_URL")

    # Vector store configuration
    VECTOR_DB_PATH: Path = Field(default=Path("./vector_store"))
    # Path to assets (must match front‑end /public/assets)
    ASSETS_PATH: Path = Field(default=Path("../public/assets"))

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
