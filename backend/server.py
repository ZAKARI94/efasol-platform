from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import resend
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend email config
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
CONTACT_RECIPIENT = os.environ.get('CONTACT_RECIPIENT', '')
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactMessageCreate(BaseModel):
    name: str
    email: str
    phone: str = ""
    message: str


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


def _build_lead_email(msg: "ContactMessage") -> str:
    return f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
      <div style="background:#1B5E20;padding:24px 32px">
        <h2 style="color:#ffffff;margin:0;font-size:20px">New EFASOL Contact Lead</h2>
        <p style="color:#FFC107;margin:4px 0 0;font-size:13px;letter-spacing:1px">EUREKA FARM SOLUTIONS</p>
      </div>
      <table style="width:100%;border-collapse:collapse;padding:24px">
        <tr><td style="padding:16px 32px 4px;color:#6b7280;font-size:12px;text-transform:uppercase">Name</td></tr>
        <tr><td style="padding:0 32px 12px;color:#1f2937;font-size:16px;font-weight:bold">{msg.name}</td></tr>
        <tr><td style="padding:4px 32px 4px;color:#6b7280;font-size:12px;text-transform:uppercase">Email</td></tr>
        <tr><td style="padding:0 32px 12px;color:#1f2937;font-size:16px">{msg.email}</td></tr>
        <tr><td style="padding:4px 32px 4px;color:#6b7280;font-size:12px;text-transform:uppercase">Phone</td></tr>
        <tr><td style="padding:0 32px 12px;color:#1f2937;font-size:16px">{msg.phone or '-'}</td></tr>
        <tr><td style="padding:4px 32px 4px;color:#6b7280;font-size:12px;text-transform:uppercase">Message</td></tr>
        <tr><td style="padding:0 32px 24px;color:#1f2937;font-size:15px;line-height:1.6">{msg.message}</td></tr>
      </table>
    </div>
    """


async def _send_lead_notification(msg: "ContactMessage") -> None:
    if not RESEND_API_KEY or not CONTACT_RECIPIENT:
        logger.info("Resend not configured; skipping email notification.")
        return
    params = {
        "from": SENDER_EMAIL,
        "to": [CONTACT_RECIPIENT],
        "reply_to": msg.email,
        "subject": f"New lead from {msg.name} — EFASOL website",
        "html": _build_lead_email(msg),
    }
    try:
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info("Lead notification email sent to %s", CONTACT_RECIPIENT)
    except Exception as e:
        logger.error("Failed to send lead email: %s", str(e))


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    obj = ContactMessage(**input.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    await _send_lead_notification(obj)
    return obj


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact_messages():
    msgs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for m in msgs:
        if isinstance(m.get('created_at'), str):
            m['created_at'] = datetime.fromisoformat(m['created_at'])
    return msgs

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()