from typing import Dict, Optional
from sqlalchemy.orm import Session

from app.db.database import Base, SessionLocal, engine
from app.models.history import HistoryRecord

Base.metadata.create_all(bind=engine)


class HistoryService:
    def __init__(self, db: Optional[Session] = None):
        self.db = db or SessionLocal()

    def create_history(self, record_type: str, title: str, description: str, status: str) -> Dict[str, object]:
        record = HistoryRecord(record_type=record_type, title=title, description=description, status=status)
        self.db.add(record)
        self.db.commit()
        self.db.refresh(record)
        return {
            'id': record.id,
            'record_type': record.record_type,
            'title': record.title,
            'description': record.description,
            'status': record.status,
            'created_at': record.created_at.isoformat() if record.created_at else None,
        }

    def list_history(self, page: int = 1, page_size: int = 10, search: str = '', record_type: str = '') -> Dict[str, object]:
        query = self.db.query(HistoryRecord)
        if search:
            search_term = search.lower()
            query = query.filter(
                (HistoryRecord.title.ilike(f'%{search_term}%')) |
                (HistoryRecord.description.ilike(f'%{search_term}%'))
            )
        if record_type:
            query = query.filter(HistoryRecord.record_type == record_type)

        total = query.count()
        items = query.order_by(HistoryRecord.created_at.desc()).offset((page - 1) * page_size).limit(page_size).all()
        return {
            'items': [
                {
                    'id': item.id,
                    'record_type': item.record_type,
                    'title': item.title,
                    'description': item.description,
                    'status': item.status,
                    'created_at': item.created_at.isoformat() if item.created_at else None,
                }
                for item in items
            ],
            'page': page,
            'page_size': page_size,
            'total': total,
            'pages': max(1, (total + page_size - 1) // page_size),
        }

    def delete_history(self, record_id: int) -> None:
        record = self.db.query(HistoryRecord).filter(HistoryRecord.id == record_id).first()
        if record:
            self.db.delete(record)
            self.db.commit()
