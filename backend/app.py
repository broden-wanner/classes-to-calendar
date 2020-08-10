from classestocalendar import app
from classestocalendar import settings

if __name__ == '__main__':
    if settings.APP_HOST:
        app.run(debug=settings.DEBUG, host=settings.APP_HOST)
    else:
        app.run(debug=settings.DEBUG)
