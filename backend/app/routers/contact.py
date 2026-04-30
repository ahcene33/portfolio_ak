from fastapi import APIRouter, HTTPException, status
from app.models.message import ContactMessage
import logging

router = APIRouter()

logger = logging.getLogger("portfolio.contact")
logger.setLevel(logging.INFO)

# Simple console logger – in production add real email dispatch (SMTP, SendGrid, etc.)
@router.post("/", status_code=status.HTTP_200_OK)
async def submit_contact(form: ContactMessage):
    try:
        # Ici on pourrait appeler un service d'email ou stocker dans une DB.
        logger.info(f"New contact from {form.name} <{form.email}> – Subject: {form.subject}")
        logger.debug(f"Message body: {form.message}")

        # Retourne un petit accusé de réception.
        return {"status": "success", "detail": "Message received, thank you!"}
    except Exception as e:
        logger.error(f"Contact endpoint error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to process your request.",
        )
