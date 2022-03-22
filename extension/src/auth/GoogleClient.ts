import { googleAuthConfig } from '../config';

export class GoogleClient {
  client: google.OAuth2Client | undefined;
  access_token: string;

  constructor() {
    this.access_token = '';
  }

  /**
   * Initializes an OAuth2 Google client that can be used to perform authentication
   * and authorization with Google.
   */
  initClient() {
    this.client = google.accounts.oauth2.initTokenClient({
      client_id: googleAuthConfig.client_id,
      scope: googleAuthConfig.scope,
      callback: (tokenResponse) => {
        console.log(tokenResponse);
        this.access_token = tokenResponse.access_token;
      },
    });
  }

  /**
   * Uses the OAuth2 client to get an access token.
   */
  getToken() {
    if (this.client) this.client.requestAccessToken();
    else
      console.error(
        'Could not get access token. Token client not initialized.'
      );
  }

  /**
   * Removes this site for access with the OAuth2 client.
   */
  revokeToken() {
    google.accounts.oauth2.revoke(this.access_token, () => {
      console.log('access token revoked');
    });
  }

  loadCalendar() {
    console.log(this.access_token);
    fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.access_token}`,
      },
    })
      .then((resp) => resp.text())
      .then((text) => console.log(text));
  }
}
