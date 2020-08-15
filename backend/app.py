from classestocalendar import app
from classestocalendar import settings
from dotenv import load_dotenv, find_dotenv

# Load environment variables from the .env file
load_dotenv(find_dotenv())


if __name__ == '__main__':
    if settings.APP_HOST:
        app.run(debug=settings.DEBUG, host=settings.APP_HOST)
    else:
        app.run(debug=settings.DEBUG)
