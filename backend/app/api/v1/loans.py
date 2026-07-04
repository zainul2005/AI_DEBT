from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.loan import Loan
from app.schemas.loan import LoanCreate, LoanResponse, LoanUpdate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get('/loans', response_model=list[LoanResponse])
def list_loans(db: Session = Depends(get_db)):
    return db.query(Loan).order_by(Loan.priority.asc(), Loan.outstanding.desc()).all()


@router.post('/loans', response_model=LoanResponse)
def create_loan(payload: LoanCreate, db: Session = Depends(get_db)):
    loan = Loan(**payload.model_dump())
    db.add(loan)
    db.commit()
    db.refresh(loan)
    return loan


@router.get('/loans/{loan_id}', response_model=LoanResponse)
def get_loan(loan_id: int, db: Session = Depends(get_db)):
    loan = db.query(Loan).filter(Loan.id == loan_id).first()
    if not loan:
        raise HTTPException(status_code=404, detail='Loan not found')
    return loan


@router.put('/loans/{loan_id}', response_model=LoanResponse)
def update_loan(loan_id: int, payload: LoanUpdate, db: Session = Depends(get_db)):
    loan = db.query(Loan).filter(Loan.id == loan_id).first()
    if not loan:
        raise HTTPException(status_code=404, detail='Loan not found')
    for key, value in payload.model_dump().items():
        setattr(loan, key, value)
    db.commit()
    db.refresh(loan)
    return loan


@router.delete('/loans/{loan_id}')
def delete_loan(loan_id: int, db: Session = Depends(get_db)):
    loan = db.query(Loan).filter(Loan.id == loan_id).first()
    if not loan:
        raise HTTPException(status_code=404, detail='Loan not found')
    db.delete(loan)
    db.commit()
    return {'message': 'Loan deleted'}
