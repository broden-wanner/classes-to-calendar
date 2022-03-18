export class GoogleAuth {
  client: google.OAuth2Client | undefined;
  access_token: string;

  constructor() {
    this.access_token = '';
  }

  initClient() {
    this.client = google.accounts.oauth2.initTokenClient({
      client_id: 'YOUR_CLIENT_ID',
      scope:
        'https://www.googleapis.com/auth/calendar.readonly \
            https://www.googleapis.com/auth/contacts.readonly',
      callback: (tokenResponse) => {
        this.access_token = tokenResponse.access_token;
      },
    });
  }

  getToken() {
    if (this.client) this.client.requestAccessToken();
    else console.error('Could not get access token');
  }

  revokeToken() {
    google.accounts.oauth2.revoke(this.access_token, () => {
      console.log('access token revoked');
    });
  }

  loadCalendar() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.googleapis.com/calendar/v3/calendars/primary/events');
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.access_token);
    xhr.send();
  }
}
