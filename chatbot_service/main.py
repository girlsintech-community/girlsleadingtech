"""
Girls Leading Tech — RAG Chatbot Service
Run: uvicorn main:app --reload --port 8001
"""

from pathlib import Path
from typing import List

from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from pydantic import BaseModel

from config import UPLOAD_PATH
from document_processor import LOADERS, process_file
from vector_store import get_index, similarity_search, upsert_chunks, delete_by_source
from llm_router import generate_response


app = FastAPI(title="Girls Leading Tech — Chatbot", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def _fix_file_upload_schema(node):
    """
    Recursively rewrite OpenAPI 3.1 file fields to the 3.0 `format: binary`
    representation. FastAPI/Pydantic v2 emits `contentMediaType` for UploadFile,
    but Swagger UI only renders a real "Choose File" button for `format: binary`.
    Without this, file fields show up as plain text boxes.
    """
    if isinstance(node, dict):
        if node.get("type") == "string" and node.get("contentMediaType") == "application/octet-stream":
            node.pop("contentMediaType", None)
            node.pop("contentEncoding", None)
            node["format"] = "binary"
        for value in node.values():
            _fix_file_upload_schema(value)
    elif isinstance(node, list):
        for item in node:
            _fix_file_upload_schema(item)


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    schema = get_openapi(
        title=app.title,
        version=app.version,
        openapi_version="3.0.3",
        description=app.description,
        routes=app.routes,
    )
    _fix_file_upload_schema(schema.get("components", {}).get("schemas", {}))
    app.openapi_schema = schema
    return schema


app.openapi = custom_openapi


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


# ---------------------------------------------------------------------------
# Ingestion endpoints
# Embed documents and store the vectors in Pinecone so /chat can use them.
# ---------------------------------------------------------------------------

@app.post("/ingest/file")
async def ingest_file(
    files: List[UploadFile] = File(...),
    namespace: str = Form("default"),
):
    """
    Upload one or more documents (PDF, DOCX, TXT, MD, CSV, XLSX) as multipart
    form-data. Each file is saved to the uploads/ directory, chunked, embedded,
    and upserted into Pinecone.

    Send each file under the form field name `files` (repeat the field to upload
    several in a single request).
    """
    UPLOAD_PATH.mkdir(parents=True, exist_ok=True)

    ingested, errors, total = [], [], 0
    for file in files:
        suffix = Path(file.filename).suffix.lower()
        if suffix not in LOADERS:
            errors.append({
                "source": file.filename,
                "error": f"Unsupported file type '{suffix}'. Supported: {sorted(LOADERS)}",
            })
            continue

        dest = UPLOAD_PATH / Path(file.filename).name
        try:
            content = await file.read()
            dest.write_bytes(content)

            chunks = process_file(dest)
            count = upsert_chunks(chunks, namespace=namespace)
            total += count
            ingested.append({"source": dest.name, "chunks": len(chunks), "vectors": count})
        except Exception as e:
            errors.append({"source": file.filename, "error": str(e)})

    if not ingested and errors:
        raise HTTPException(status_code=400, detail={"errors": errors})

    return {
        "status": "ingested",
        "namespace": namespace,
        "ingested": ingested,
        "errors": errors,
        "total_vectors": total,
    }


@app.delete("/ingest/source/{source}")
def delete_source(source: str, namespace: str = "default"):
    """Remove all vectors that originated from a given source file."""
    try:
        delete_by_source(source, namespace=namespace)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return {"status": "deleted", "source": source, "namespace": namespace}


@app.get("/health")
def health():
    return {"status": "ok"}
