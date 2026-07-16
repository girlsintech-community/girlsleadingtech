from __future__ import annotations

import os
from functools import lru_cache
from typing import List, Dict, Any

import google.generativeai as genai
from groq import Groq

from config import settings

# System instructions for answering based on retrieved context
SYSTEM_INSTRUCTIONS = """You are a helpful and knowledgeable AI assistant for the Girls Leading Tech community.

Your task is to answer the user's question using ONLY the information provided in the retrieved context.

Guidelines:
- Base every answer strictly on the retrieved context. Do not make assumptions or add information that is not explicitly stated.
- If the answer is not available in the retrieved context, clearly respond:
  "I couldn't find this information in the available Girls Leading Tech resources. For the most accurate and up-to-date information, please visit https://www.girlsleadingtech.com/."
- Never fabricate facts, dates, names, links, or event details.
- If the context contains relevant links (such as the official website, event pages, LinkedIn posts, YouTube sessions, registration forms, or other official resources), include them in your response.
- If the user asks about a specific event, program, initiative, workshop, or session, provide any relevant links found in the context.
- Do not mention document names, chunk IDs, retrieval details, or internal references.
- If multiple pieces of context are relevant, combine them into a single clear answer without repeating information.
- Keep responses concise, friendly, and professional (typically 2–6 sentences unless more detail is requested).
- Use bullet points only when they improve readability.
- Preserve the exact wording of names, titles, dates, and URLs from the context.
- If the context contains conflicting information, acknowledge the conflict instead of choosing one version.

Your goal is to provide accurate, trustworthy, and concise responses while avoiding hallucinations."""

@lru_cache(maxsize=1)
def _get_gemini_model() -> genai.GenerativeModel:
    api_key = settings.gemini_api_key or os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set. Please set it in your .env file or environment.")
    genai.configure(api_key=api_key)
    return genai.GenerativeModel(
        model_name=settings.gemini_model,
        system_instruction=SYSTEM_INSTRUCTIONS
    )

@lru_cache(maxsize=1)
def _get_groq_client() -> Groq:
    api_key = settings.groq_api_key or os.getenv("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY is not set. Please set it in your .env file or environment.")
    return Groq(api_key=api_key)

def build_prompt(query: str, chunks: List[Dict[str, Any]]) -> str:
    """
    Builds the prompt structure combining the context and user query.
    """
    context_str = ""
    for i, chunk in enumerate(chunks, 1):
        source = chunk.get("metadata", {}).get("source", "unknown")
        context_str += f"\n--- Source: {source} (Chunk {i}) ---\n{chunk.get('text', '')}\n"

    prompt = f"""RELEVANT CONTEXT CHUNKS:
{context_str}

USER QUERY:
{query}

ANSWER:"""
    return prompt

def generate_response(query: str, chunks: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Attempts to generate a response using Gemini first. 
    If Gemini fails (due to rate limit, API failure, or timeout),
    retries using Groq.
    """
    prompt = build_prompt(query, chunks)
    
    # 1. Attempt Gemini first
    try:
        print(f"[llm_router] Attempting generation with Gemini ({settings.gemini_model})...")
        model = _get_gemini_model()
        
        # Call Gemini with a timeout (default timeout can be set via request options if needed)
        response = model.generate_content(prompt)
        
        if not response or not response.text:
            raise Exception("Received empty response from Gemini")
            
        print("[llm_router] Successfully generated response with Gemini.")
        return {
            "answer": response.text,
            "provider": "gemini",
            "model": settings.gemini_model
        }
        
    except Exception as gemini_err:
        print(f"[llm_router] Gemini failed: {gemini_err}. Retrying with Groq...")
        
        # 2. Fallback to Groq
        try:
            print(f"[llm_router] Attempting generation with Groq ({settings.groq_model})...")
            client = _get_groq_client()
            
            # Formulate chat completion for Groq passing system instruction in system message
            chat_completion = client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": SYSTEM_INSTRUCTIONS
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                model=settings.groq_model,
                timeout=15.0  # Groq call timeout
            )
            
            answer = chat_completion.choices[0].message.content
            if not answer:
                raise Exception("Received empty response from Groq")
                
            print("[llm_router] Successfully generated response with Groq.")
            return {
                "answer": answer,
                "provider": "groq",
                "model": settings.groq_model
            }
            
        except Exception as groq_err:
            print(f"[llm_router] Groq also failed: {groq_err}")
            raise Exception(f"Both Gemini and Groq LLMs failed.\nGemini Error: {gemini_err}\nGroq Error: {groq_err}")

if __name__ == "__main__":
    from retriver import retrieve_top_k
    import sys
    
    test_query = sys.argv[1] if len(sys.argv) > 1 else "What are the initiatives of Girls Leading Tech?"
    print(f"Retrieving chunks for query: '{test_query}'...")
    try:
        chunks = retrieve_top_k(test_query, top_k=5)
        print(f"Retrieved {len(chunks)} chunks.")
        
        print("\nRouting request through LLM Router...")
        res = generate_response(test_query, chunks)
        print(f"\n--- LLM ANSWER (via {res['provider'].upper()} - {res['model']}) ---")
        print(res["answer"])
    except Exception as e:
        print(f"\nExecution failed: {e}")