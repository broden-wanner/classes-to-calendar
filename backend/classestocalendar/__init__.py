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

# Add cors config in development
if settings.FLASK_ENV == 'development':
    # Set only api calls to come from localhost in development
    cors = CORS(app, resources={r'/api/*': {'origins': 'http://localhost:3000'}})


from . import routes
from . import exceptions