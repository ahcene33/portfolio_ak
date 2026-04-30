# backend/app/routers/chat.py
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from app.core.rag import answer_query
import logging

router = APIRouter()
logger = logging.getLogger("portfolio.chat")
logger.setLevel(logging.INFO)

class ChatRequest(BaseModel):
    question: str

@router.post("/", status_code=status.HTTP_200_OK)
async def chat_endpoint(req: ChatRequest):
    """
    POST /api/chat
    Body: {"question": "Your question"}
    Returns: {"answer": "..."}   (real LLM answer or demo placeholder)
    """
    try:
        answer = answer_query(req.question)
        logger.info(f"Chat answered – question: {req.question[:30]}")
        return {"answer": answer}
    except Exception as e:
        logger.error(f"Chat endpoint error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to generate a response",
        )
