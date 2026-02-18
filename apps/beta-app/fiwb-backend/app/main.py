from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings

app = FastAPI(title="FIWB AI Backend")

try:
    from app.database import engine
    from app.models import Base
    Base.metadata.create_all(bind=engine)
except Exception as e:
    import logging
    logger = logging.getLogger("uvicorn.error")
    logger.warning(f"⚠️ Could not create database tables on startup (DB might not be ready): {e}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.api import chat, courses, auth, notifications, drive, moodle

app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(courses.router, prefix="/api/courses", tags=["courses"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["notifications"])
app.include_router(drive.router, prefix="/api/drive", tags=["drive"])
app.include_router(moodle.router, prefix="/api/moodle", tags=["moodle"])
from app.api import gmail
app.include_router(gmail.router, prefix="/api/gmail", tags=["gmail"])

from app.api import admin
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])

from app.api import search
app.include_router(search.router, prefix="/api/search", tags=["search"])

from app.intelligence.scheduler import start_scheduler

@app.on_event("startup")
async def on_startup():
    # start_scheduler()  # Manually disabled to end background tasks
    pass

@app.get("/")
async def root():
    return {"message": "FIWB AI Backend is running"}

@app.get("/health")
async def health_check():
    """Health check endpoint with system status"""
    from app.database import SessionLocal
    from app.models import User, Course
    
    from sqlalchemy import func
    from app.models import Material
    
    try:
        db = SessionLocal()
        user_count = db.query(User).count()
        course_count = db.query(Course).count()
        
        # Breakdown of materials
        gmail_count = db.query(Material).filter(Material.course_id == "GMAIL_INBOX").count()
        course_mats_count = db.query(Material).filter(Material.course_id != "GMAIL_INBOX").count()
        
        # Sum of all docs indexed across all users
        total_docs = db.query(func.sum(User.supermemory_docs_indexed)).scalar() or 0
        
        db.close()
        
        return {
            "status": "healthy",
            "database": "connected",
            "users": user_count,
            "courses": course_count,
            "materials": {
                "gmail": gmail_count,
                "academic": course_mats_count,
                "total": gmail_count + course_mats_count
            },
            "supermemory_docs_indexed": total_docs,
            "version": "1.0.2"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e)
        }
