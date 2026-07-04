from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.loan import Loan
from app.services.financial_health import FinancialHealthService

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get('/financial-health')
def get_financial_health(db: Session = Depends(get_db)):
    loans = db.query(Loan).all()
    payload = [
        {'outstanding': loan.outstanding}
        for loan in loans
    ]
    service = FinancialHealthService()
    return service.analyze(monthly_income=5200, monthly_expenses=3100, loans=payload)
