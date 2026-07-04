from fastapi import APIRouter, Query

from app.services.rights import BorrowerRightsService

router = APIRouter()


@router.get('/rights')
def get_rights(search: str = Query(default=''), category: str = Query(default='')):
    service = BorrowerRightsService()
    return service.get_rights(search=search, category=category)
