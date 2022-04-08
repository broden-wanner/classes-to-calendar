import { GoogleClient } from '../api/GoogleClient';
import CalendarListEntry from '../types/CalendarListEntry';
import sidePanelHtml from './SidePanel.component.html';

export const SidePanel = (googleClient: GoogleClient) => {
  // Create the side panel
  const panel = document.createElement('div');
  panel.id = 'classes-to-calendar-side-panel-wrap';
  panel.classList.add('side-panel-wrap', 'side-panel-wrap--opened');
  panel.innerHTML = sidePanelHtml;

  // Add the panel HTML to the body
  document.body.append(panel);

  // Get the form element
  const form = document.querySelector('#add-to-calendar-form') as HTMLFormElement;

  // Initialize the Google client with a custom callback
  googleClient.initClient(() => {
    // Add existing calendars to the select
    googleClient.listCalendars().then((errorOrCalendars) => {
      if ('message' in errorOrCalendars) {
        console.error('Could not get calendar list. See error above.');
        return;
      }
      const calendarOptions = (errorOrCalendars as CalendarListEntry[])
        .filter((calendar) => calendar.accessRole === 'owner')
        .map(
          (calendar) =>
            `<option value=${calendar.id}>
              ${calendar.summary} ${calendar.primary ? '(Primary)' : ''}
            </option>`
        )
        .join(' ');

      const calendarSelect = document.getElementById('existingCalendarSelect');
      calendarSelect.innerHTML = calendarOptions;
    });

    // Enable the form
    form.querySelector('#add-to-calendar-form-fields').removeAttribute('disabled');
  });

  // Handle sign-in
  const gsiButton = document.getElementById('google-sign-in');
  gsiButton.addEventListener('click', () => googleClient.getToken());

  // Add submit form handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = document.querySelector('#add-to-calendar-form') as HTMLFormElement;

    // Either create new calendar or add to existing calendar
    if (form['newCalendarRadio'].checked) {
      const newCalendarName = form['newCalendarNameInput'].value;
      console.log('New calendar name:', newCalendarName);
    } else if (form['addToExistingCalendarRadio'].checked) {
      const existingCalendarName = form['existingCalendarSelect'].value;
      console.log('Existing calendar name:', existingCalendarName);
    }
  });

  // Add change handler to form
  form.addEventListener('change', () => {
    const form = document.querySelector('#add-to-calendar-form') as HTMLFormElement;
    // Change which sections are disabled depending on which radio button is checked.
    if (form['newCalendarRadio'].checked) {
      document.getElementById('newCalendarNameInput').removeAttribute('disabled');
      document.getElementById('existingCalendarSelect').setAttribute('disabled', 'true');
    } else if (form['addToExistingCalendarRadio'].checked) {
      document.getElementById('existingCalendarSelect').removeAttribute('disabled');
      document.getElementById('newCalendarNameInput').setAttribute('disabled', 'true');
    }
  });

  return panel;
};
