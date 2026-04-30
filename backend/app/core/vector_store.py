"""
Simplified vector store wrapper.
- Uses FAISS (in‑memory) if available.
- Stores embeddings of your LinkedIn JSON + CV text.
- Provides a `similarity_search(query, k=5)` method.
"""

from pathlib import Path
import json
import logging
from typing import List, Tuple

import numpy as np
import faiss
from openai import OpenAI
from openai.embeddings_utils import get_embedding

logger = logging.getLogger("vector_store")
logger.setLevel(logging.INFO)

class VectorStore:
    def __init__(self, db_path: Path, openai_api_key: str):
        self.db_path = db_path
        self.client = OpenAI(api_key=openai_api_key)
        self.dimension = 1536  # OpenAI Ada embeddings size
        self.index = faiss.IndexFlatL2(self.dimension)
        self.documents: List[str] = []  # raw texts

    def _embed(self, text: str) -> np.ndarray:
        # Utilise l'API OpenAI embeddings (ada‑002)
        # Si vous utilisez Ollama, changez la méthode d'embedding ici.
        response = self.client.embeddings.create(
            input=[text],
            model="text-embedding-ada-002"
        )
        embedding = np.array(response.data[0].embedding, dtype="float32")
        return embedding

    def ingest_from_json(self, json_path: Path):
        """
        Parse un JSON LinkedIn simple (exemple: {"summary": "...", "experiences": [...], "projects": [...]})
        Et convertit chaque section en un texte *document*.
        """
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        # Exemple naïf : chaque expérience et projet devient un document
        for exp in data.get("experiences", []):
            text = f"{exp.get('title','')} at {exp.get('company','')} – {exp.get('description','')}"
            self.add_document(text)

        for proj in data.get("projects", []):
            text = f"{proj.get('name','')} – {proj.get('summary','')}"
            self.add_document(text)

        logger.info(f"Ingested {len(self.documents)} documents from LinkedIn JSON")

    def ingest_from_pdf(self, pdf_path: Path):
        """
        Basic PDF ingestion (requires pypdf). Extracts raw text page‑by‑page.
        """
        from pypdf import PdfReader

        reader = PdfReader(str(pdf_path))
        for page in reader.pages:
            text = page.extract_text()
            if text:
                self.add_document(text.strip())

        logger.info(f"Ingested PDF {pdf_path.name} – total docs: {len(self.documents)}")

    def add_document(self, text: str):
        embedding = self._embed(text)
        self.index.add(np.expand_dims(embedding, axis=0))
        self.documents.append(text)

    def similarity_search(self, query: str, k: int = 5) -> List[Tuple[str, float]]:
        """
        Retourne les `k` documents les plus proches du query + leurs scores.
        """
        q_emb = self._embed(query)
        distances, indices = self.index.search(np.expand_dims(q_emb, axis=0), k)

        results = []
        for idx, dist in zip(indices[0], distances[0]):
            if idx < len(self.documents):
                results.append((self.documents[idx], float(dist)))
        return results


# ------------------------------------------------------------------ #
# Helper to build/store the vector DB when the server starts (once)
# ------------------------------------------------------------------ #
def get_vector_store() -> VectorStore:
    cfg = __import__("app.core.config", fromlist=["settings"]).settings
    db_path = cfg.VECTOR_DB_PATH
    db_path.mkdir(parents=True, exist_ok=True)

    store = VectorStore(db_path=db_path, openai_api_key=cfg.OPENAI_API_KEY)
    # Only ingest if the index is empty (first launch)
    if store.index.ntotal == 0:
        assets = cfg.ASSETS_PATH
        # Ingest LinkedIn JSON
        linkedin_path = assets / "linkedin.json"
        if linkedin_path.is_file():
            store.ingest_from_json(linkedin_path)

        # Ingest CV PDF (optionnel)
        cv_path = assets / "cv.pdf"
        if cv_path.is_file():
            store.ingest_from_pdf(cv_path)

        logger.info("Vector store built and ready.")
    else:
        logger.info("Vector store already contains embeddings.")
    return store
