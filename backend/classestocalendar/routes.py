import os
import json
from flask import render_template, request, jsonify
from .exceptions import ParseError, FileError
from .utils import allowed_file
from .umncalendar.html_parser import generate_umn_classes_from_html
from .umncalendar.models import UMNClass
from .umncalendar.convert import to_ics_string
from . import app
from . import settings


@app.route('/')
@app.route('/classes')
@app.route('/upload')
@app.route('/privacy-policy')
def index():
    """
    Return the main index.html whenever these routes are visited. The React router will
    handle the routing.
    """
    return render_template('index.html')


@app.route('/api/upload-html', methods=['POST'])
def upload_html_endpoint():
    """
    Processes uploaded html and returns the classes extracted in it with the html parser.
    Raises FileError if there is no file or if it is not and image. Raises a parse error
    if there is a problem generating classes.
    """
    # Check if there is a file in the request
    if 'file' not in request.files:
        app.logger.error('No file is present for upload')
        raise FileError('No file is present.')

    html_file = request.files['file']

    # If no file is selected
    if html_file and html_file.filename == '':
        app.logger.error('No file selected for upload.')
        raise FileError('No file is selected.')

    # Ensure the file is html
    if html_file and allowed_file(html_file.filename):
        try:
            # Get the classes in the html
            html_string = html_file.read()
            start_date = settings.DEFAULT_CLASS_START_DATE
            end_date = settings.DEFAULT_CLASS_END_DATE
            result = generate_umn_classes_from_html(html_string=html_string, start_date=start_date, end_date=end_date)

            # Change each class into a json serializeable dictionary
            result['classes'].sort(key=lambda c: c.name)
            result['classes'] = [c.serialize() for c in result['classes']]

            # Log an error if there is one
            if result['extracted_all'] == False:
                app.logger.error(f'Parse error: {result["message"]}')

            # Return the json response of the classes in an array
            return json.dumps(result)

        except Exception as e:
            app.logger.error(e)
            raise ParseError('Error extracting classes. Make sure the file is html and from MyU.')
    else:
        app.logger.error('Invalid file type for upload.')
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
        'clientId': settings.ACTUAL_GOOGLE_CLIENT_ID,
        'apiKey': settings.ACTUAL_GOOGLE_CALENDAR_API_KEY,
        'scope': settings.ACTUAL_GOOGLE_SCOPE,
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
    })

