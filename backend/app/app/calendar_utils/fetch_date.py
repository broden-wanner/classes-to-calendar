import datetime
import json
import logging
from typing import Any, Dict

import requests

logger = logging.getLogger(__name__)

def fetch_current_term_from_api() -> Dict[str, Any] :
    """Creates a list of date objects gathered from the public api

    Returns:
        DatesResponse: Dictionary containing the list of date objects and other
                         information
    """
    DEFAULT_CLASS_START_DATE = datetime.date.today()
    DEFAULT_CLASS_END_DATE = DEFAULT_CLASS_START_DATE + datetime.timedelta(weeks=15)

    try:
        API_URL = 'https://terms.umn.edu/umntc/ugrd/soonest/today'
        response = requests.get(API_URL, timeout=5)

    except requests.Timeout:
        logger.exception(f"Request timed out")
        return {
            "start_date": DEFAULT_CLASS_START_DATE,
            "end_date": DEFAULT_CLASS_END_DATE,
            "extracted_date": False,
            "message": f"Request timed out",
        }

    except Exception as e:
        logger.exception(f"An error occurred: {e}")
        return {
            "start_date": DEFAULT_CLASS_START_DATE,
            "end_date": DEFAULT_CLASS_END_DATE,
            "extracted_date": False,
            "message": f"Could not get dates: {e}",
        }
    
    json_content = response.text

    # Parse the JSON content into a Python object
    data = json.loads(json_content)

    # Access the attributes of the object
    # term_name = data['data'][0]['attributes']['name']
    start_date = data['data'][0]['attributes']['begin-date']
    end_date = data['data'][0]['attributes']['end-date']
    return {
        "start_date": start_date,
        "end_date": end_date,
        "extracted_date": True,
        "message": "Successfully extracted classes",
    }