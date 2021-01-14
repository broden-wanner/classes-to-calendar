import os
import datetime
from dotenv import load_dotenv, find_dotenv

# Load environment variables from the .env file
load_dotenv(find_dotenv())

# Flask settings
FLASK_ENV = os.getenv('FLASK_ENV')
APP_HOST = os.getenv('APP_HOST')
DEBUG = True if FLASK_ENV == 'development' else False

# Static files
STATIC_FOLDER = '../../frontend/build'
STATIC_URL_PATH = ''
TEMPLATE_FOLDER = '../../frontend/build'

# App settings
DEFAULT_CLASS_START_DATE = datetime.date(year=2021, month=1, day=19)
DEFAULT_CLASS_END_DATE = datetime.date(year=2021, month=5, day=3)
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'html', 'htm'])

# Google Calendar keys
ACTUAL_GOOGLE_CLIENT_ID = os.getenv('ACTUAL_GOOGLE_CLIENT_ID')
ACTUAL_GOOGLE_CALENDAR_API_KEY = os.getenv('ACTUAL_GOOGLE_CALENDAR_API_KEY')
ACTUAL_GOOGLE_SCOPE = os.getenv('ACTUAL_GOOGLE_SCOPE')
