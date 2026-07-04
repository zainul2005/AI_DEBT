from fastapi import APIRouter, Depends
from app.services.insights import InsightsService

router = APIRouter()


def get_insights_service() -> InsightsService:
    return InsightsService()


@router.get('/snapshot')
def get_snapshot(service: InsightsService = Depends(get_insights_service)):
    return service.get_dashboard_snapshot()
