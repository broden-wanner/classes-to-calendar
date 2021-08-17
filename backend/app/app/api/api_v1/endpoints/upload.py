import datetime
import logging
from typing import Dict, Optional

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from app import schemas
from app.calendar_utils.html_parser import parse_umn_classes_from_myu_html
from app.core.config import settings
from app.exceptions.parser import ParseException

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/myu-calendar", response_model=schemas.ClassesResponse)
async def upload_html_endpoint(
    calendar_html: UploadFile = File(...),
    class_start_date_str: Optional[str] = Form(None),
    class_end_date_str: Optional[str] = Form(None),
) -> Dict[str, str]:

    # Check file is uploaded
    if not calendar_html.content_type:
        logger.error("No file present in request")
        raise HTTPException(status_code=400, detail="No file present.")

    # Ensure file type is HTML
    if calendar_html.content_type != "text/html":
        actual_content_type = calendar_html.content_type
        detail = (
            f"Invalid file type. Got content type of {actual_content_type}"
            f" but must be text/html."
        )
        logger.error(detail)
        raise HTTPException(
            status_code=400,
            detail=detail,
        )

    # Get the selected date range if available
    class_start_date = (
        datetime.datetime.strptime(class_start_date_str, "%Y-%m-%d").date()
        if class_start_date_str
        else settings.DEFAULT_CLASS_START_DATE
    )
    class_end_date = (
        datetime.datetime.strptime(class_end_date_str, "%Y-%m-%d").date()
        if class_end_date_str
        else settings.DEFAULT_CLASS_END_DATE
    )

    # Get the classes in the html
    content = await calendar_html.read()
    if isinstance(content, bytes):
        html_string = content.decode("utf-8")
    else:
        html_string = str(content)

    # Extract UMN classes
    try:
        result = parse_umn_classes_from_myu_html(
            html_string=html_string,
            start_date=class_start_date,
            end_date=class_end_date,
        )

        # Log an error if there is one
        if not result["extracted_all"]:
            logger.error(f'Parse error: {result["message"]}')

        # Return the extracted classes
        return result
    except Exception as e:
        logger.exception(f"Parsing error in HTML. Error type {type(e).__name__}: {e}")
        raise ParseException(
            f"Could not extract classes from HTML. Got error type "
            f"'{type(e).__name__}': {repr(e)}"
        )
