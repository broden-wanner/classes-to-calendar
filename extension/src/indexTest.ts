import { GoogleClient } from './api/GoogleClient';
import { AddToCalendarButton } from './components/AddToCalendarButton';
import { SidePanel } from './components/SidePanel';
import './global.css';

/**
 * Defines behavior for the add to calendar button.
 * Gets the calendar HTML, parses it, and submits passes it to the frontend.
 */
const onAddToCalendarButtonClick = () => {
  console.log('Add to Calendar button clicked!');
  // Make a GET request from API for calendar HTML
  //   const url = `https://www.myu.umn.edu/psp/psprd/EMPLOYEE/CAMP/s/WEBLIB_IS_DS.ISCRIPT1.FieldFormula.IScript_DrawSection?group=UM_SSS&section=UM_SSS_ACAD_SCHEDULE&pslnk=1&ITG=125034&cmd=smartnav&effdt=${fullClassWeekDate}`;
  //   return fetch(url)
  //     .then((response: Response) => response.text())
  //     .then((htmlBody: string) => {
  //       console.log('Successfully retrieved correct calendar HTML from request.');
  //       return submitCalendarHTML(htmlBody);
  //     });
};

/**
 * Called when the extension loads. Akin to a main method/function.
 */
const onLoad = () => {
  document.body.appendChild(AddToCalendarButton(onAddToCalendarButtonClick));

  const googleClient = new GoogleClient();
  const panel = SidePanel(googleClient);
  document.body.appendChild(panel);
};

onLoad();
