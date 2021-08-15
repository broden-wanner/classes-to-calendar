from fastapi import Request
from fastapi.responses import JSONResponse

from .parser import ParseException


async def parse_exception_handler(request: Request, exc: ParseException):
    return JSONResponse(
        status_code=400,
        content={"message": exc.message},
    )
