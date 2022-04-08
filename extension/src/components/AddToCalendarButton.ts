import addToCalendarHtml from './AddToCalendarButton.component.html';

/**
 * Makes the "add to calendar" button on the page and sets the on click method.
 */
export const AddToCalendarButton = (onClickCallback: () => void) => {
  // Make the button
  const addToCalendarButtonContainer = document.createElement('div');
  addToCalendarButtonContainer.innerHTML = addToCalendarHtml;
  const button = addToCalendarButtonContainer.firstChild as HTMLElement;
  button.addEventListener('click', onClickCallback);
  return button;
};
