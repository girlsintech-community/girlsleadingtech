"""
Girls Leading Tech — RAG Chatbot Service
Run: uvicorn main:app --reload --port 8001
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from vector_store import get_index, similarity_search
from llm_router import generate_response


app = FastAPI(title="Girls Leading Tech — Chatbot", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    print("[startup] Pre-initializing Pinecone index...")
    get_index()
    
    print("[startup] Pre-loading SentenceTransformer embedding model...")
    from embeddings import _get_model
    try:
        _get_model()
    except Exception as e:
        print(f"[startup] Warning: Could not preload embedding model: {e}")
        
    print("[startup] Pre-initializing LLM clients...")
    from llm_router import _get_gemini_model, _get_groq_client
    try:
        _get_gemini_model()
    except Exception as e:
        print(f"[startup] Warning: Could not preload Gemini model: {e}")
        
    try:
        _get_groq_client()
    except Exception as e:
        print(f"[startup] Warning: Could not preload Groq client: {e}")
        
    print("[startup] Warmup completed. Service is ready!")


class ChatRequest(BaseModel):
    question: str
    top_k: int = 5


@app.post("/chat")
def chat(payload: ChatRequest):
    results = similarity_search(payload.question, top_k=payload.top_k)
    try:
        llm_res = generate_response(payload.question, results)
        return {
            "question": payload.question,
            "answer": llm_res["answer"],
            "provider": llm_res["provider"],
            "model": llm_res["model"],
            "sources": [r["metadata"] for r in results]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
def health():
    return {"status": "ok"}
