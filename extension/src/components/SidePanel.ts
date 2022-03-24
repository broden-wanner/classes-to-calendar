import { GoogleClient } from '../api/GoogleClient';
import CalendarListEntry from '../types/CalendarListEntry';
import { GoogleSignInButton } from './GoogleSignInButton';

export const SidePanel = (googleClient: GoogleClient) => {
  // Initialize the Google client with a custom callback
  googleClient.initClient(() => {
    // Enable the necessary forms
    const makeNewCalendar = document.getElementById('make-new-calendar-option') as HTMLInputElement;
    const addToCalendar = document.getElementById('add-to-calendar-option') as HTMLInputElement;
    const newCalendarInput = document.getElementById('new-calendar-input') as HTMLInputElement;
    makeNewCalendar.removeAttribute('disabled');
    addToCalendar.removeAttribute('disabled');
    newCalendarInput.removeAttribute('disabled');
  });
  const signInButton = GoogleSignInButton(() => googleClient.getToken());

  const panel = document.createElement('div');
  panel.id = 'classes-to-calendar-side-panel-wrap';
  panel.classList.add('side-panel-wrap', 'side-panel-wrap--opened');
  panel.innerHTML = `
    <div class="side-panel">
      <h3> Sign-In with Google </h3>
      <p> Before you can add the classes to your calendar, you must first sign in with Google. </p>
      <div class="google-sign-in-button-container">
        ${signInButton.outerHTML}
      </div>
      <hr />
      <h3> Add to Google Calendar </h3>
      <p> You can add your classes to Google Calendar by either making a new calendar or adding them to an existing one. (You must be signed in with Google before you can do this.) </p>
      <div>
        <form id="add-to-calendar-form" onSubmit="">
          <div>
            <input id="make-new-calendar-option" type="radio" name="add-calendar" checked ${
              !googleClient.isSignedIn && 'disabled'
            }>
            <label for="new-calendar">Make a new calendar</label>
          </div>

          <div>
            <input id="new-calendar-input" type="text" name="new-calendar-name" placeholder="New calendar name..." ${
              !googleClient.isSignedIn && 'disabled'
            }>
          </div>

          <div>
            <input id="add-to-calendar-option" type="radio" name="add-calendar" ${
              !googleClient.isSignedIn && 'disabled'
            }>
            <label for="add-to-existing-calendar">Add to existing calendar</label>
          </div>

          <div id="add-to-existing-calendar-container">
          </div>
        </form>
      </div>
      <hr />
      
      <h3> Export to Another Calendar </h3>
    </div>
  `;

  // Add event listener for the callback for dynamic creation
  document.body.addEventListener('change', (e) => {
    const eventTarget = e.target as HTMLInputElement;
    if (eventTarget.id === 'make-new-calendar-option' || eventTarget.id === 'add-to-calendar-option') {
      const makeNewCalendar = document.getElementById('make-new-calendar-option') as HTMLInputElement;
      // const addToCalendar = document.getElementById('add-to-calendar-option') as HTMLInputElement;
      const newCalendarNameInput = document.getElementById('new-calendar-input') as HTMLInputElement;
      const existingCalendarSelect = document.getElementById('existing-calendar-list');

      if (makeNewCalendar.checked) {
        console.log('Make new calendar!!');
        newCalendarNameInput.removeAttribute('disabled');
        if (existingCalendarSelect) existingCalendarSelect.setAttribute('disabled', 'true');
      } else {
        console.log('Add to calendar!');
        newCalendarNameInput.setAttribute('disabled', 'true');
        if (existingCalendarSelect) existingCalendarSelect.removeAttribute('disabled');

        // Add calendars to select element and append if not already there
        if (!existingCalendarSelect) {
          googleClient.listCalendars().then((errorOrCalendars) => {
            if ('message' in errorOrCalendars) {
              console.error('Could not get calendar list. See error above.');
            } else {
              const calendarOptions = (errorOrCalendars as CalendarListEntry[]).map(
                (calendar) => `<option value=${calendar.id}>${calendar.summary}</option>`
              );

              const calendarSelect = document.createElement('div');
              calendarSelect.innerHTML = `
              <select name="existing-calendar-list" id="existing-calendar-list">
                ${calendarOptions}
              </select>
            `;

              document.getElementById('add-to-existing-calendar-container').appendChild(calendarSelect);
            }
          });
        }
      }
    }
  });

  return panel;
};
