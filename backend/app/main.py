import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import contact
from app.core.config import settings

app = FastAPI(
    title="Portfolio – AI RAG Backend",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ------------------------------------------------------------------ #
# CORS – autorise le front‑end Next.js (http://localhost:3000)
# ------------------------------------------------------------------ #
origins = [
    "http://localhost:3000",
    "https://portfolio_ak.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------------ #
# Include routers
# ------------------------------------------------------------------ #
app.include_router(contact.router, prefix="/api/contact", tags=["Contact"])

# ------------------------------------------------------------------ #
# Root health check
# ------------------------------------------------------------------ #
@app.get("/")
async def health():
    return {"status": "ok", "message": "Portfolio RAG backend is running"}

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=int(settings.PORT),
        reload=True,
    )
