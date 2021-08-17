import axios from "axios";
import globals from "../globals";

class GCalClient {
  signedIn = false;
  gapi = null;
  onLoadCallback = null;
  calendar = null;
  GoogleAuth = null;

  constructor() {
    this.initClient = this.initClient.bind(this);
    this.handleClientLoad = this.handleClientLoad.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.handleClientLoad();
  }

  /**
   * Gets the api config from the backend
   */
  async getConfig() {
    return await axios.get(`${globals.apiUrl}/calendar/google-config`);
  }

  /**
   * Performs the initial auth setup:
   * Gets the config and initializes the Google API client
   * Sets the GoogleAuth object and listens for signedIn status
   */
  async initClient() {
    this.gapi = window["gapi"];
    const config = await this.getConfig();
    this.gapi.client
      .init(config.data)
      .then(() => {
        // Get the google auth instance
        this.GoogleAuth = this.gapi.auth2.getAuthInstance();
        if (!this.GoogleAuth) {
          throw new Error("Could not authorize Google API");
        }

        // Listen for sign-in state changes.
        this.GoogleAuth.isSignedIn.listen(this.updateSigninStatus);

        // Handle the initial sign-in state.
        this.updateSigninStatus(this.GoogleAuth.isSignedIn.get());

        // Call the callback
        if (this.onLoadCallback) {
          this.onLoadCallback(this.signedIn);
        }
      })
      .catch((e) => {
        console.error("Error in setting up the google client:");
        console.error(e);
      });
  }

  /**
   * Add the Google API Client script to the DOM and load.
   * When done loading, call this.initClient
   */
  handleClientLoad() {
    this.gapi = window["gapi"];
    var script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    document.body.appendChild(script);
    script.onload = () => {
      window["gapi"].load("client:auth2", this.initClient);
    };
  }

  /**
   * Signs the users in using the GoogleAuth object
   * @returns {boolean} - if true, sign-in succeeded. else, did not succeed.
   */
  handleAuthClick() {
    if (this.GoogleAuth) {
      this.GoogleAuth.signIn();
      return true;
    } else {
      console.error("App not authorized with Google");
      return false;
    }
  }

  /**
   * Callback to be passed into the listen state to update the signed in status
   * @param {boolean} isSignedIn
   */
  updateSigninStatus(isSignedIn) {
    this.signedIn = isSignedIn;
    // Call the callback
    if (this.onLoadCallback) {
      this.onLoadCallback(isSignedIn);
    }
  }

  /**
   * Gets the calendar list of the user.
   * @returns {Promise}
   */
  listCalendars() {
    return this.gapi.client.calendar.calendarList.list();
  }

  /**
   * Creates a new calendar for the user
   * @param {string} name - name of the new calendar to create
   * @returns {Promise}
   */
  createCalendar(name) {
    const calendar = {
      summary: name,
      timeZone: "America/Chicago",
    };
    return this.gapi.client.calendar.calendars.insert(calendar).then((res) => {
      this.calendar = res.result;
      console.log(res);
    });
  }

  /**
   * Adds a new event to the calendar specified by this.calendar
   * @param {object} event - the event to add to a calendar
   */
  createEvent(event) {
    return this.gapi.client.calendar.events.insert({
      calendarId: this.calendar.id,
      resource: event,
    });
  }

  /**
   * Sets the calendar on the client
   * @param {object} calendar - calendar object
   */
  setCalendar(calendar) {
    this.calendar = calendar;
  }
}

export default GCalClient;
