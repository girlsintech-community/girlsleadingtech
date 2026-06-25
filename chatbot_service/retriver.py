from __future__ import annotations

from functools import lru_cache
from typing import List, Dict, Any

from pinecone import Pinecone
from config import settings
from embeddings import embed_query

@lru_cache(maxsize=1)
def _get_pinecone() -> Pinecone:
    print(f"[pinecone] Initializing Pinecone")
    return Pinecone(api_key=settings.pinecone_api_key)

def get_index():
    """Return the Pinecone index object."""
    pc = _get_pinecone()
    return pc.Index(settings.pinecone_index_name)

def retrieve_top_k(
    query: str,
    top_k: int = 5,
    namespace: str = "default"
) -> List[Dict[str, Any]]:
    """
    Retrieve the top k most similar document chunks for a query from Pinecone
    using cosine similarity.
    """
    # 1. Get the Pinecone index
    index = get_index()
    
    # 2. Generate the embedding vector for the query string
    query_vector = embed_query(query)
    
    # 3. Query the index using cosine similarity
    response = index.query(
        vector=query_vector,
        top_k=top_k,
        namespace=namespace,
        include_metadata=True
    )
    
    # 4. Format the matched results
    results = []
    for match in response.matches:
        meta = match.metadata or {}
        results.append({
            "id": match.id,
            "score": round(match.score, 4),
            "text": meta.pop("text", ""),  # Remove text from metadata and place it at root
            "metadata": meta
        })
        
    return results

if __name__ == "__main__":
    import sys
    test_query = sys.argv[1] if len(sys.argv) > 1 else "Girls Leading Tech"
    print(f"Retrieving top 5 chunks for query: '{test_query}'...")
    try:
        matches = retrieve_top_k(test_query, top_k=5)
        for i, match in enumerate(matches, 1):
            print(f"\nMatch #{i} (Score: {match['score']})")
            print(f"ID: {match['id']}")
            print(f"Text snippet: {match['text'][:250]}...")
            print(f"Metadata: {match['metadata']}")
    except Exception as e:
        print(f"Error during retrieval: {e}")
