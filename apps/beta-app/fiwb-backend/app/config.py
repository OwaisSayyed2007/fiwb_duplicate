import os
from dotenv import load_dotenv
from typing import Optional

load_dotenv()

class Settings:
    PROJECT_NAME: str = "FIWB AI"
    SUPERMEMORY_URL: str = os.getenv("SUPERMEMORY_URL", "https://api.supermemory.ai")
    SUPERMEMORY_API_KEY: str = os.getenv("SUPERMEMORY_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    GOOGLE_CLIENT_ID: str = os.getenv("GOOGLE_CLIENT_ID", "")
    GOOGLE_CLIENT_SECRET: str = os.getenv("GOOGLE_CLIENT_SECRET", "")
    GOOGLE_PUBSUB_TOPIC: Optional[str] = os.getenv("GOOGLE_PUBSUB_TOPIC")
    # If DATABASE_URL is not provided, we default to localhost only if we're not on Railway
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    if not DATABASE_URL:
        # Check if we are on Railway (they provide RAILWAY_ENVIRONMENT or just use a safer check)
        if os.getenv("RAILWAY_STATIC_URL") or os.getenv("RAILWAY_PUBLIC_DOMAIN"):
            # We are on Railway but DATABASE_URL is missing! 
            # This is a config error on the user's part or a linking issue.
            DATABASE_URL = "postgresql://missing_db_url_on_railway"
        else:
            DATABASE_URL = "postgresql://localhost/fiwb"
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    OWNER_EMAIL: str = "owaissayyed2007@gmail.com"

settings = Settings()
