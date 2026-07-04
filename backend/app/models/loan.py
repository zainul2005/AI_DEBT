from sqlalchemy import Column, Float, Integer, String
from app.db.database import Base


class Loan(Base):
    __tablename__ = 'loans'

    id = Column(Integer, primary_key=True, index=True)
    bank = Column(String(255), nullable=False)
    loan_type = Column(String(255), nullable=False)
    outstanding = Column(Float, nullable=False)
    interest = Column(Float, nullable=False)
    emi = Column(Float, nullable=False)
    overdue = Column(Float, nullable=False)
    priority = Column(String(50), nullable=False)
