from flask import Flask
from flask_cors import CORS
from . import settings

# Initialize the flask app
app = Flask(
    import_name=__name__,
    static_folder=settings.STATIC_FOLDER,
    template_folder=settings.TEMPLATE_FOLDER,
    static_url_path=settings.STATIC_URL_PATH
)

# Add cors config to allow all origins
cors = CORS(app)

# Import routes and handlers after app initialization
from . import routes
from . import exceptions
from . import handlers
