import axios from 'axios';

class GCalClient {
  signedIn = false;
  gapi = null;
  onLoadCallback = null;
  calendar = null;

  constructor() {
    this.initClient = this.initClient.bind(this);
    this.handleClientLoad = this.handleClientLoad.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.handleClientLoad();
  }

  async getConfig() {
    return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/google-config`);
  }

  async initClient() {
    this.gapi = window['gapi'];
    const config = await this.getConfig();
    this.gapi.client
      .init(config.data)
      .then(() => {
        // Listen for sign-in state changes.
        this.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
        // Handle the initial sign-in state.
        this.updateSigninStatus(this.gapi.auth2.getAuthInstance().isSignedIn.get());
        if (this.onLoadCallback) {
          this.onLoadCallback(this.signedIn);
        }
      })
      .catch(e => {
        console.error(e);
      });
  }

  handleClientLoad() {
    this.gapi = window['gapi'];
    var script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    document.body.appendChild(script);
    script.onload = () => {
      window['gapi'].load('client:auth2', this.initClient);
    };
  }

  handleAuthClick() {
    if (this.gapi) {
      this.gapi.auth2.getAuthInstance().signIn();
    } else {
      console.log('Error: this.gapi not loaded');
    }
  }

  updateSigninStatus(isSignedIn) {
    this.signedIn = isSignedIn;
  }

  listCalendars() {
    return this.gapi.client.calendar.calendarList.list();
  }

  createCalendar(name) {
    const calendar = {
      summary: name,
      timeZone: 'America/Chicago'
    };
    return this.gapi.client.calendar.calendars.insert(calendar).then(res => {
      this.calendar = res.result;
      console.log(res);
    });
  }

  createEvent(event) {
    return this.gapi.client.calendar.events.insert({
      calendarId: this.calendar.id,
      resource: event
    });
  }

  setCalendar(calendar) {
    this.calendar = calendar;
  }
}

export default GCalClient;
