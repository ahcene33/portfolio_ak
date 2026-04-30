# Portfolio — Data Analyst (ahcene33)

⚡ Portfolio ultra‑moderne, **dark‑blue**, dédié aux projets Data & IA (énergie, aéronautique, environnement).  
Stack : **Next.js 14 (App Router) + Tailwind CSS + shadcn/ui + Framer‑Motion** côté front, **FastAPI** côté back avec un moteur **RAG** (OpenAI / Ollama) qui s’appuie sur le CV et le JSON LinkedIn.

## 📦 Installation

```bash
# clone le repo
git clone https://github.com/ahcene33/portfolio_ak.git
cd portfolio_ak

# Front‑end
npm install
npm run dev   # http://localhost:3000

# Back‑end
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows : .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env       # 👉 ajoutez vos clés OpenAI, etc.
uvicorn app.main:app --reload   # http://localhost:8000
