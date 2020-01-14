import os
import datetime
import json
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from calendar_utils.ocr import generate_umn_classes, ParseError
from calendar_utils.models import UMNClass
from calendar_utils.convert import to_ics_string
try:
    from PIL import Image
except ImportError:
    import Image

#### Config ####

load_dotenv()
FLASK_ENV = os.getenv('FLASK_ENV')
DEBUG = True if FLASK_ENV == 'development' else False
APP_HOST = os.getenv('APP_HOST')
STATIC_FOLDER = '../frontend/build'
STATIC_URL_PATH = ''
TEMPLATE_FOLDER = '../frontend/build'


#### Main flask app ####

app = Flask(__name__, static_folder=STATIC_FOLDER, template_folder=TEMPLATE_FOLDER, static_url_path=STATIC_URL_PATH)


#### Cors config ####

if FLASK_ENV == 'development':
    # Set only api calls to come from localhost in development
    cors = CORS(app, resources={r'/api/*': {'origins': 'http://localhost:3000'}}) 


#### Helper Functions and Classes ####

def allowed_file(filename):
    """ Checks the allowed file extensions """
    ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class FileError(Exception):
    """
    Class for error raised when an uploaded file is invalid
    """
    def __init__(self, message):
        self.message = str(message)
    
    def __str__(self):
        return self.message

    def to_dict(self):
        return {'message': self.message}


#### Regular routes ####

@app.route('/')
@app.route('/classes')
@app.route('/upload')
def index():
    """
    Return the main index.html whenever these routes are visited. The React router will
    handle the routing.
    """
    return render_template('index.html')


#### Error Handlers ####

@app.errorhandler(ParseError)
def handle_parse_error(error):
    """ Serializes the parse errors in the error for a response """
    error.message  = f'Parse Error: {error.message}'
    response = jsonify(error.to_dict())
    response.status_code = 400
    return response

@app.errorhandler(FileError)
def handle_file_error(error):
    """ Serializes the file errors for response """
    error.message  = f'File Error: {error.message}'
    response = jsonify(error.to_dict())
    response.status_code = 400
    return response


#### API routes ####

@app.route('/api/upload', methods=['POST'])
def upload_endpoint():
    """
    Processes an uploaded image and returns the classes extracted in it with pytesseract.
    Raises FileError if there is no file or if it is not and image. Raises a parse error
    if there is a problem generating classes.
    """
    # Check if there is a file in the request
    if 'file' not in request.files:
        app.logger.error('No file is present for upload')
        raise FileError('No file is present.')

    image = request.files['file']

    # If no file is selected
    if image and image.filename == '':
        app.logger.error('No file selected for upload.')
        raise FileError('No file is selected.')

    # Ensure the image has the allowable filetypes
    if image and allowed_file(image.filename):
        try:
            # Get the classes in the image
            classes = generate_umn_classes(img=Image.open(image),
                                        start_date=datetime.date(year=2020, month=1, day=21),
                                        end_date=datetime.date(year=2020, month=5, day=4))
            # Change each class into a json serializeable dictionary
            classes.sort(key=lambda c: c.name)
            classes = [c.serialize() for c in classes]
            # Return the json response of the classes in an array
            return json.dumps(classes)
        except ParseError as e:
            app.logger.error(e)
            raise ParseError(e.message)
        except Exception as e:
            app.logger.error(e)
            raise ParseError('Error extracting classes.')
    else:
        app.logger.error(e)
        raise FileError('Invalid file type.')


@app.route('/api/events', methods=['POST'])
def events_endpoint():
    """
    Accepts classes in the requests and casts them to gcal event format
    """
    classes = json.loads(request.data)
    # Put the days of of the week back into an array
    for c in classes:
        c['days_of_week'] = c['days_of_week'].split(', ')
    classes = [UMNClass(**c).to_event_dict() for c in classes]
    return json.dumps(classes)

@app.route('/api/ics', methods=['POST'])
def ics_endpoint():
    """
    Accepts classes in the request and returns an ics string with all
    the events
    """
    classes = json.loads(request.data)
    # Put the days of of the week back into an array
    for c in classes:
        c['days_of_week'] = c['days_of_week'].split(', ')
    classes = [UMNClass(**c) for c in classes]
    content = to_ics_string(classes)
    return json.dumps({'ics': content})

@app.route('/api/google-config', methods=['GET'])
def google_config_endpoint():
    """
    Sends the google calendar api config to the frontend
    """
    return json.dumps({
        'clientId': os.getenv('ACTUAL_GOOGLE_CLIENT_ID'),
        'apiKey': os.getenv('ACTUAL_GOOGLE_CALENDAR_API_KEY'),
        'scope': os.getenv('ACTUAL_GOOGLE_SCOPE'),
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
    })


if __name__ == '__main__':
    if APP_HOST:
        app.run(debug=DEBUG, host=APP_HOST)
    else:
        app.run(debug=DEBUG)
