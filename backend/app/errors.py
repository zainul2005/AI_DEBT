import logging
from typing import Any, Dict, Optional

from fastapi import HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

logger = logging.getLogger('finrelief_app')
logger.setLevel(logging.INFO)


class ApiError(Exception):
    def __init__(self, message: str, status_code: int = 500, detail: Optional[Dict[str, Any]] = None):
        self.message = message
        self.status_code = status_code
        self.detail = detail or {}
        super().__init__(message)


def error_response(status_code: int, message: str, detail: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    payload = {'success': False, 'error': {'message': message, 'status_code': status_code}}
    if detail:
        payload['error']['detail'] = detail
    return payload


async def http_exception_handler(_: Request, exc: HTTPException) -> JSONResponse:
    logger.warning('HTTPException %s: %s', exc.status_code, exc.detail)
    return JSONResponse(status_code=exc.status_code, content=error_response(exc.status_code, str(exc.detail)))


async def api_error_handler(_: Request, exc: ApiError) -> JSONResponse:
    logger.error('ApiError %s: %s', exc.status_code, exc.message)
    return JSONResponse(status_code=exc.status_code, content=error_response(exc.status_code, exc.message, exc.detail))


async def validation_exception_handler(_: Request, exc: RequestValidationError) -> JSONResponse:
    logger.warning('Validation error: %s', exc.errors())
    return JSONResponse(status_code=422, content=error_response(422, 'Validation failed', {'errors': exc.errors()}))


async def unhandled_exception_handler(_: Request, exc: Exception) -> JSONResponse:
    logger.exception('Unhandled exception: %s', exc)
    return JSONResponse(status_code=500, content=error_response(500, 'Internal server error'))
