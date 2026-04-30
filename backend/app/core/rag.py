"""
RAG (Retrieval‑Augmented Generation) pipeline
- Retrieve relevant chunks via VectorStore
- Build prompt with system message + retrieved docs
- Call LLM (OpenAI / Ollama) and return answer
"""

from typing import List, Tuple
from .vector_store import get_vector_store
from app.core.config import settings

# LLM client (OpenAI)
from openai import OpenAI

vector_store = get_vector_store()
llm_client = OpenAI(api_key=settings.OPENAI_API_KEY)


def build_prompt(query: str, retrieved: List[Tuple[str, float]]) -> str:
    context = "\n\n---\n\n".join([doc for doc, _ in retrieved])
    prompt = f"""You are a professional data‑analyst assistant. Use ONLY the information provided in the context below to answer the user’s question. Do NOT hallucinate.

**Context**:
{context}

**Question**:
{query}
"""
    return prompt


def answer_query(query: str, k: int = 5) -> str:
    # 1️⃣ Retrieve
    retrieved = vector_store.similarity_search(query, k=k)

    # 2️⃣ Build prompt
    prompt = build_prompt(query, retrieved)

    # 3️⃣ LLM call
    response = llm_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "system", "content": "You are a concise and factual assistant."},
                  {"role": "user", "content": prompt}],
        temperature=0.0,
        max_tokens=800,
    )
    answer = response.choices[0].message.content.strip()
    return answer
