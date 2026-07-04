from fastapi import APIRouter
from pydantic import BaseModel

from app.errors import ApiError
from app.services.settlement_prediction import SettlementPredictionService

router = APIRouter()


class SettlementPredictionRequest(BaseModel):
    outstanding_loan: float
    monthly_income: float
    monthly_expenses: float
    emi: float
    lump_sum: float


class GeminiClient:
    def generate(self, prompt: str) -> str:
        return (
            "Present a hardship-based settlement offer with a clear lump-sum proposal and request a waiver of late fees."
        )


@router.post('/settlement-predict')
def predict_settlement(payload: SettlementPredictionRequest):
    try:
        service = SettlementPredictionService(gemini_client=GeminiClient())
        return service.predict(
            outstanding_loan=payload.outstanding_loan,
            monthly_income=payload.monthly_income,
            monthly_expenses=payload.monthly_expenses,
            emi=payload.emi,
            lump_sum=payload.lump_sum,
        )
    except ValueError as exc:
        raise ApiError('Invalid prediction input', status_code=400, detail={'reason': str(exc)}) from exc
    except Exception as exc:
        raise ApiError('Unable to generate settlement prediction', status_code=500, detail={'reason': str(exc)}) from exc
