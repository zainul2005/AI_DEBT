from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.errors import ApiError
from app.services.history import HistoryService

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get('/history')
def list_history(
    page: int = Query(default=1),
    page_size: int = Query(default=10),
    search: str = Query(default=''),
    record_type: str = Query(default=''),
    db: Session = Depends(get_db),
):
    try:
        service = HistoryService(db=db)
        return service.list_history(page=page, page_size=page_size, search=search, record_type=record_type)
    except Exception as exc:
        raise ApiError('Unable to load history', status_code=500, detail={'reason': str(exc)}) from exc


@router.post('/history')
def create_history(payload: dict, db: Session = Depends(get_db)):
    try:
        service = HistoryService(db=db)
        return service.create_history(
            record_type=payload.get('record_type', 'general'),
            title=payload.get('title', 'History entry'),
            description=payload.get('description', ''),
            status=payload.get('status', 'completed'),
        )
    except Exception as exc:
        raise ApiError('Unable to save history', status_code=500, detail={'reason': str(exc)}) from exc


@router.delete('/history/{record_id}')
def delete_history(record_id: int, db: Session = Depends(get_db)):
    try:
        service = HistoryService(db=db)
        service.delete_history(record_id)
        return {'deleted': True}
    except Exception as exc:
        raise ApiError('Unable to delete history entry', status_code=500, detail={'reason': str(exc)}) from exc
