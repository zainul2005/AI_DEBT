from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import Base, engine
from app.api.v1 import (
    ai,
    auth,
    financial_health,
    history,
    insights,
    loans,
    negotiation_email,
    rights,
    settlement_prediction,
)
from app.errors import (
    ApiError,
    api_error_handler,
    http_exception_handler,
    unhandled_exception_handler,
    validation_exception_handler,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FinRelief AI API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(insights.router, prefix="/insights", tags=["insights"])
app.include_router(loans.router, prefix="/api", tags=["loans"])
app.include_router(financial_health.router, prefix="/api", tags=["financial-health"])
app.include_router(settlement_prediction.router, prefix="/api", tags=["settlement-prediction"])
app.include_router(negotiation_email.router, prefix="/api", tags=["negotiation-email"])
app.include_router(rights.router, prefix="/api", tags=["rights"])
app.include_router(history.router, prefix="/api", tags=["history"])
app.include_router(ai.router, prefix="/api", tags=["ai"])

app.add_exception_handler(ApiError, api_error_handler)
app.add_exception_handler(404, http_exception_handler)
app.add_exception_handler(401, http_exception_handler)
app.add_exception_handler(403, http_exception_handler)
app.add_exception_handler(500, unhandled_exception_handler)
app.add_exception_handler(Exception, unhandled_exception_handler)
app.add_exception_handler(422, validation_exception_handler)


@app.get("/", tags=["Root"])
def root():
    return {
        "message": "FinRelief AI Backend is running successfully!",
        "status": "ok",
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "ok"
    }
