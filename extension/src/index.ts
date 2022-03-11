import { fullClassWeekDate } from './config';
import { UMNClass } from './UMNClass';

/**
 * Defines behavior for the add to calendar button.
 * Gets the calendar HTML, parses it, and submits passes it to the frontend.
 */
const onAddToCalendarButtonClick = () => {
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
 * Makes the "add to calendar" button on the page and sets the on click method.
 */
const makeAddToCalendarButton = () => {
  // Make the button
  const addToCalendarButton = document.createElement('button');
  addToCalendarButton.setAttribute('id', 'submit-classes-button');
  addToCalendarButton.innerHTML = `<i class="fa fa-external-link" aria-hidden="true"></i>Add to Google Calendar`;
  addToCalendarButton.classList.add('btn', 'btn-default', 'myu_fx-150ms');
  addToCalendarButton.style.cssText = 'color: #fff; background-color: rgba(122,0,25,0.75);';
  addToCalendarButton.onclick = onAddToCalendarButtonClick;
  // Add it to the page
  const buttonContainer = document.querySelector('.myu_btn-group');
  if (!buttonContainer) {
    console.error('Classes To Calendar Extension: Could not add button.');
    return;
  }
  buttonContainer.append(addToCalendarButton);
};

/**
 * Sets up an observer to create the button when the main body is created
 * @param mutationsList - List of mutations made
 */
const mutationCallback = (mutationsList: MutationRecord[]) => {
  mutationsList.forEach((mutation) => {
    const nodes = Array.from(mutation.addedNodes);
    for (const mutatedNode of nodes) {
      const node: Element = mutatedNode as Element;
      // Wait for the main body creation
      if (node.matches && node.matches('#ID_UM_SSS_ENRL_SCHEDULE_PGLT > div')) {
        // Check for the button group
        if (node.querySelector('.myu_btn-group')) {
          makeAddToCalendarButton();
          return;
        }
      }
    }
  });
};

/**
 * Called when the extension loads. Akin to a main method/function.
 */
const onLoad = () => {
  // Create the mutation observer and start observing
  const observer = new MutationObserver(mutationCallback);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
  });
};
