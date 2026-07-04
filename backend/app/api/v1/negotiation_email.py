from fastapi import APIRouter
from pydantic import BaseModel

from app.services.negotiation_email import NegotiationEmailService

router = APIRouter()


class NegotiationEmailRequest(BaseModel):
    borrower_name: str
    bank: str
    loan: str
    settlement_amount: float
    reason: str


class GeminiClient:
    def generate(self, prompt: str) -> str:
        return (
            "Dear Lending Team,\n\nI am writing to request a formal review of my account and to discuss a reasonable settlement offer that reflects my current hardship circumstances. I would appreciate the opportunity to resolve this matter in a mutually beneficial way.\n\nSincerely,\nBorrower"
        )


@router.post('/negotiation-email')
def generate_negotiation_email(payload: NegotiationEmailRequest):
    service = NegotiationEmailService(gemini_client=GeminiClient())
    return service.generate(
        borrower_name=payload.borrower_name,
        bank=payload.bank,
        loan=payload.loan,
        settlement_amount=payload.settlement_amount,
        reason=payload.reason,
    )
