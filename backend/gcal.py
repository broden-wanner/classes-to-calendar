import datetime
import pickle
import os.path
import datetime
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

from calocr import generate_umn_classes

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/calendar']


def get_service():
    """
    Shows basic usage of the Google Calendar API.
    Prints the start and name of the next 10 events on the user's calendar.
    """
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('gcal-files/token.pickle'):
        with open('gcal-files/token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'gcal-files/credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('calendar', 'v3', credentials=creds)
    return service


service = get_service()
classes = generate_umn_classes(img_path='example-images/calendar.png',
                               start_date=datetime.date(year=2020, month=1, day=21),
                               end_date=datetime.date(year=2020, month=5, day=4))

# Make a new calendar for the classes
calendar = {
    'summary': 'Class Schedule',
    'timeZone': 'America/Chicago'
}
created_calendar = service.calendars().insert(body=calendar).execute()
print('[INFO] Created calendar')

# Insert each class as an event on the newly created calendar
for cl in classes:
    event = service.events().insert(calendarId=created_calendar['id'], body=cl.to_gcal_event()).execute()
    print(f'[INFO] Created {cl.name}')

print('[INFO] Finished creating events')
