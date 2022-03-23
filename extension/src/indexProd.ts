import { AddToCalendarButton } from './components/AddToCalendarButton';
// import UMNClass from './models/UMNClass';

// import { fullClassWeekDate } from './config';

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
 * Sets up an observer to create the button when the main body is created
 * @param mutationsList - List of mutations made
 */
const addToCalendarButtonMutationCallback = (
  mutationsList: MutationRecord[]
) => {
  mutationsList.forEach((mutation) => {
    const nodes = Array.from(mutation.addedNodes);
    for (const mutatedNode of nodes) {
      const node: Element = mutatedNode as Element;
      // Wait for the main body creation
      if (node.matches && node.matches('#ID_UM_SSS_ENRL_SCHEDULE_PGLT > div')) {
        // Check for the button group
        if (node.querySelector('.myu_btn-group')) {
          // Create the button
          const button = AddToCalendarButton(onAddToCalendarButtonClick);
          // Add it to the page
          const buttonContainer = document.querySelector('.myu_btn-group');
          if (!buttonContainer) {
            console.error(
              'Classes To Calendar Extension: Could not add button.'
            );
            return;
          }
          buttonContainer.append(button);
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
  const observer = new MutationObserver(addToCalendarButtonMutationCallback);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
  });
};

onLoad();
