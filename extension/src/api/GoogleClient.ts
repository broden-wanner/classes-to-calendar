import { googleAuthConfig } from '../config';
import CalendarEvent from '../types/CalendarEvent';
import CalendarListEntry, { CalendarId } from '../types/CalendarListEntry';
import CalendarListResponse from '../types/CalendarListResponse';
import ErrorMessage from '../types/ErrorMessage';

export class GoogleClient {
  client: google.OAuth2Client | undefined;
  access_token: string;
  isClientInitialized: boolean;

  constructor() {
    this.access_token = '';
    this.isClientInitialized = false;
  }

  /**
   * Initializes an OAuth2 Google client that can be used to perform authentication
   * and authorization with Google.
   */
  initClient(tokenClientCallback: () => void): void {
    if (this.isClientInitialized) return;
    this.client = google.accounts.oauth2.initTokenClient({
      client_id: googleAuthConfig.client_id,
      scope: googleAuthConfig.scope,
      callback: (tokenResponse) => {
        this.access_token = tokenResponse.access_token;
        tokenClientCallback();
      },
    });
    this.isClientInitialized = true;
  }

  /**
   * Uses the OAuth2 client to get an access token.
   */
  getToken(): void {
    if (this.client) this.client.requestAccessToken();
    else console.error('Could not get access token. Token client not initialized.');
  }

  /**
   * Removes this site for access with the OAuth2 client.
   */
  revokeToken() {
    google.accounts.oauth2.revoke(this.access_token, () => {
      console.log('access token revoked');
    });
  }

  get isSignedIn(): boolean {
    return this.access_token !== '';
  }

  /**
   * Gets all calendars for the current user and lists them.
   *
   * @returns Promise containing the list of calendars object.
   */
  listCalendars(): Promise<CalendarListEntry[] | ErrorMessage> {
    return fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.access_token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          const error = data.error as ErrorMessage;
          console.error(`Could not get calendar list. Got the following error: ${error.message}`);
          return error;
        }
        return (data as CalendarListResponse).items;
      });
  }

  /**
   * Creates a new calendar for the user
   * @param name - name of the new calendar to create
   * @returns The newly created calendar entry
   */
  createCalendar(name: string): Promise<CalendarListEntry | ErrorMessage> {
    const calendar: CalendarListEntry = {
      summary: name,
      timeZone: 'America/Chicago',
    };
    return fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.access_token}`,
      },
      body: JSON.stringify(calendar),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          const error = data.error as ErrorMessage;
          console.error(`Could not create calendar. Got the following error: ${error.message}`);
          return error;
        }
        return data as CalendarListEntry;
      });
  }

  /**
   * Adds a new event to the calendar specified by this.calendar
   * @param event - the event to add to a calendar
   * @param calendarId - the id of the calendar to add the event to
   */
  createEvent(event: CalendarEvent, calendarId: CalendarId): Promise<CalendarEvent | ErrorMessage> {
    return fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.access_token}`,
      },
      body: JSON.stringify(event),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          const error = data.error as ErrorMessage;
          console.error(`Could not create event. Got the following error: ${error.message}`);
          return error;
        }
        return data as CalendarEvent;
      });
  }
}
