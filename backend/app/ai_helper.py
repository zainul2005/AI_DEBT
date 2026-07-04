import os
import time
from typing import Optional

import requests


class GeminiAIHelper:
    def __init__(self, api_key: Optional[str] = None, timeout: int = 8):
        self.api_key = api_key or os.getenv('GEMINI_API_KEY')
        self.timeout = timeout
        self.base_url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

    def generate(self, prompt: str) -> str:
        if not self.api_key:
            raise ValueError('Missing Gemini API key')

        try:
            response = requests.post(
                f"{self.base_url}?key={self.api_key}",
                json={'contents': [{'parts': [{'text': prompt}]}]},
                timeout=self.timeout,
            )
            response.raise_for_status()
            payload = response.json()
            text = payload.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text', '')
            if text:
                return text.strip()
        except requests.Timeout:
            raise TimeoutError('Gemini request timed out')
        except requests.RequestException as exc:
            raise RuntimeError(f'Gemini request failed: {exc}') from exc

        raise RuntimeError('Gemini response did not contain usable text')
