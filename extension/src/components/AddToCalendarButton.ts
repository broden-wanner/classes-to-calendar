/**
 * Makes the "add to calendar" button on the page and sets the on click method.
 */
export const AddToCalendarButton = (onClickCallback: () => void) => {
  // Make the button
  const addToCalendarButton = document.createElement('button');
  addToCalendarButton.setAttribute('id', 'submit-classes-button');
  addToCalendarButton.innerHTML = `<i class="fa fa-external-link" aria-hidden="true"></i>Add to Google Calendar`;
  addToCalendarButton.classList.add('btn', 'btn-default', 'myu_fx-150ms');
  addToCalendarButton.style.cssText =
    'color: #fff; background-color: rgba(122,0,25,0.75);';
  addToCalendarButton.onclick = onClickCallback;
  return addToCalendarButton;
};
