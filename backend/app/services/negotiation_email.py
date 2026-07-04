from typing import Dict, Optional

from app.ai_helper import GeminiAIHelper


class NegotiationEmailService:
    def __init__(self, gemini_client: Optional[object] = None):
        self.gemini_client = gemini_client or GeminiAIHelper()

    def _fallback_body(self, borrower_name: str, bank: str, loan: str, settlement_amount: float, reason: str) -> str:
        return (
            f"Dear {bank} Team,\n\n"
            f"My name is {borrower_name}, and I am writing regarding my {loan} account. "
            f"I am requesting a hardship-based settlement review and would appreciate consideration of a reduced payoff of ${settlement_amount:.2f}. "
            f"This request is based on my current financial circumstances, specifically {reason}. "
            f"I would be grateful for the opportunity to discuss a mutually agreeable resolution that supports both parties.\n\n"
            f"Thank you for your time and consideration.\n\n"
            f"Sincerely,\n"
            f"{borrower_name}"
        )

    def generate(self, borrower_name: str, bank: str, loan: str, settlement_amount: float, reason: str) -> Dict[str, object]:
        if self.gemini_client:
            try:
                ai_body = self.gemini_client.generate(
                    f"Write a professional negotiation email about a borrower named {borrower_name} requesting settlement of ${settlement_amount} for a {loan} with {bank} due to {reason}."
                )
                return {'body': ai_body, 'subject': 'Settlement Review Request', 'source': 'gemini'}
            except (TimeoutError, ValueError, RuntimeError):
                pass

        return {
            'body': self._fallback_body(borrower_name, bank, loan, settlement_amount, reason),
            'subject': 'Settlement Review Request',
            'source': 'fallback'
        }
