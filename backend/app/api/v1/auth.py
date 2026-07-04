from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import create_access_token, get_password_hash, verify_password
from app.errors import ApiError
from app.db.database import SessionLocal
from app.models.user import User
from app.schemas.user import ForgotPasswordRequest, ResetPasswordRequest, TokenResponse, UserCreate, UserLogin

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post('/register', response_model=TokenResponse)
def register_user(user_in: UserCreate, db: Session = Depends(get_db)):
    try:
        existing = db.query(User).filter(User.email == user_in.email).first()
        if existing:
            raise ApiError('Email already registered', status_code=400)

        user = User(
            full_name=user_in.full_name,
            email=str(user_in.email),
            hashed_password=get_password_hash(user_in.password),
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        token = create_access_token(subject=str(user.id))
        return {
            'access_token': token,
            'token_type': 'bearer',
            'user': {'id': user.id, 'full_name': user.full_name, 'email': user.email}
        }
    except ApiError:
        raise
    except Exception as exc:
        db.rollback()
        raise ApiError('Unable to register user', status_code=500, detail={'reason': str(exc)}) from exc



@router.post('/login', response_model=TokenResponse)
def login_user(credentials: UserLogin, db: Session = Depends(get_db)):
    try:
        user = db.query(User).filter(User.email == str(credentials.email)).first()
        if not user or not verify_password(credentials.password, user.hashed_password):
            raise ApiError('Invalid credentials', status_code=401)

        token = create_access_token(subject=str(user.id))
        return {
            'access_token': token,
            'token_type': 'bearer',
            'user': {'id': user.id, 'full_name': user.full_name, 'email': user.email}
        }
    except ApiError:
        raise
    except Exception as exc:
        raise ApiError('Unable to sign in', status_code=500, detail={'reason': str(exc)}) from exc

    token = create_access_token(subject=str(user.id))
    return {
        'access_token': token,
        'token_type': 'bearer',
        'user': {'id': user.id, 'full_name': user.full_name, 'email': user.email}
    }


@router.post('/forgot-password')
def forgot_password(payload: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == str(payload.email)).first()
    if not user:
        raise ApiError('No account found for that email', status_code=404)

    return {'message': 'Reset instructions sent'}


@router.post('/reset-password')
def reset_password(payload: ResetPasswordRequest, db: Session = Depends(get_db)):
    if not payload.token:
        raise ApiError('Reset token is required', status_code=400)

    user_id = payload.token.split(':')[-1]
    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        raise ApiError('Invalid reset token', status_code=404)

    user.hashed_password = get_password_hash(payload.new_password)
    db.commit()
    return {'message': 'Password updated successfully'}
