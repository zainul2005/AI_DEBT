from pydantic import BaseModel


class LoanCreate(BaseModel):
    bank: str
    loan_type: str
    outstanding: float
    interest: float
    emi: float
    overdue: float
    priority: str


class LoanUpdate(LoanCreate):
    pass


class LoanResponse(LoanCreate):
    id: int
