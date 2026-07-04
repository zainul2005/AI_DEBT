from fastapi import APIRouter
from pydantic import BaseModel

from app.ai_helper import GeminiAIHelper

router = APIRouter()


class AIRequest(BaseModel):
    prompt: str


@router.post('/ai/generate')
def generate_ai_content(payload: AIRequest):
    helper = GeminiAIHelper()
    try:
        return {'text': helper.generate(payload.prompt), 'source': 'gemini'}
    except (TimeoutError, ValueError, RuntimeError) as exc:
        return {'text': f'Fallback response: {str(exc)}', 'source': 'fallback'}
