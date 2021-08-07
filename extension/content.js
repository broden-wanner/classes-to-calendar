"use strict";

// Globals
const apiRoot = `https://umnclassestocalendar.com/api`;
const redirectUrl = `https://umnclassestocalendar.com/classes`;
const retryWaitTime = 1500;
const maxAttempts = 10;
const fullClassWeekDate = "2021-09-13";

let currentAttempt = 0;

/**
 * Submits the current HTML of the page
 */
function submitCalendarHTML(calendarHTML) {
  // Added the file to the form data for submission
  let submitFormData = new FormData();
  submitFormData.append("file", new File([calendarHTML], "calendar.html", { type: "text/html" }));

  // Make the post request with the html string
  let url = `${apiRoot}/upload-html`;
  return fetch(url, {
    method: "POST",
    body: submitFormData,
  })
    .then((response) => response.json())
    .then((response) => {
      console.log("Got response from backend:", response);
      const { classes } = response;
      // Assert that the returned data is an array
      if (classes && Array.isArray(classes) && classes.length > 0) {
        // Add the classes to the app
        const encodedJSON = encodeURIComponent(JSON.stringify(classes));
        window.open(`${redirectUrl}?course_json=${encodedJSON}`);
      } else {
        throw new Error("No classes extracted. Ensure your html meets the requirements.");
      }
      return Promise.resolve("Submission successful.");
    });
}

/**
 * Gets calendar HTML from the body of the webpage. If it fails, the function will
 * click to the next week and attempt again until the max number of attempts has been
 * reached. Calls submitCalendarHTML if successful.
 * @returns Promise
 */
function getAndSubmitCalendarFromBody() {
  // Stop if max attempts reached
  if (currentAttempt >= maxAttempts) {
    alert("Could get classes because of an unknown error. Please contact the extension author.");
    return Promise.resolve("Error submitting.");
  }

  // Increment the attempt number
  currentAttempt += 1;

  // Get the calendar HTML
  let calendarHTML = document.documentElement.innerHTML;

  // Move onto the next page if there is "No classes" text
  let noScheduledText = "No classes";
  if (calendarHTML.includes(noScheduledText)) {
    // Go on to the next page
    document.querySelector("#ID_UM_SSS_ENRL_SCHEDULE_PGLT button.btn.btn-link.next").click();
    // Retry the request
    setTimeout(getAndSubmitCalendarFromBody, retryWaitTime);
    return Promise.resolve("Error submitting.");
  }

  // Submit the calendar HTML and move onto next week if there is an error
  return submitCalendarHTML(calendarHTML)
    .then((response) => {
      console.log("Successfully submitted calendar HTML from getAndSubmitCalendarFromBody()", response);
      return Promise.resolve("Successful submission from getAndSubmitCalendarFromBody()");
    })
    .catch((error) => {
      console.warn("Error with html upload", error);
      // Go on to the next page
      document.querySelector("#ID_UM_SSS_ENRL_SCHEDULE_PGLT button.btn.btn-link.next").click();
      // Retry the request
      setTimeout(getAndSubmitCalendarFromBody, retryWaitTime);
      return Promise.resolve("Error submitting.");
    });
}

/**
 * Gets calendar HTML by making GET request to API. Calls submitCalendarHTML if successful.
 * @returns Promise
 */
function getAndSubmitCalendarFromRequest() {
  // Make a GET request from API for calendar HTML
  const url = `https://www.myu.umn.edu/psp/psprd/EMPLOYEE/CAMP/s/WEBLIB_IS_DS.ISCRIPT1.FieldFormula.IScript_DrawSection?group=UM_SSS&section=UM_SSS_ACAD_SCHEDULE&pslnk=1&ITG=125034&cmd=smartnav&effdt=${fullClassWeekDate}`;
  return fetch(url)
    .then((response) => response.text())
    .then((htmlBody) => {
      console.log("Successfully retrieved correct calendar HTML from request.");
      return submitCalendarHTML(htmlBody);
    });
}

/**
 * Defines behavior for the add to calendar button.
 * First, it attempts to get and submit calendar HTML from a web request to the backend.
 * If that fails, it then defaults to the older method of getting the calendar HTML from
 * the current body.
 */
function onAddToCalendarButtonClick() {
  getAndSubmitCalendarFromRequest()
    .then((response) => {
      console.log("Final verification that submission succeeded with getting calendar from request.", response);
    })
    .catch((error) => {
      console.warn("Got error on submitting calendar from the request. Attempting using calendar body...");
      console.warn(error);
      getAndSubmitCalendarFromBody()
        .then((response) => {
          console.log("Final verification that submission succeeded with getting calendar from body.", response);
        })
        .catch((error) => {
          console.error("Got error on submitting calendar from the body", error);
        });
    });
}

/**
 * Makes the "add to calendar" button on the page and sets the on click method.
 */
function makeAddToCalendarButton() {
  // Make the button
  const addToCalendarButton = document.createElement("button");
  addToCalendarButton.setAttribute("id", "submit-classes-button");
  addToCalendarButton.innerHTML = `<i class="fa fa-external-link" aria-hidden="true"></i>Add to Google Calendar`;
  addToCalendarButton.classList.add("btn", "btn-default", "myu_fx-150ms");
  addToCalendarButton.style.cssText = "color: #fff; background-color: rgba(122,0,25,0.75);";
  addToCalendarButton.onclick = onAddToCalendarButtonClick;
  // Add it to the page
  const buttonContainer = document.querySelector(".myu_btn-group");
  buttonContainer.append(addToCalendarButton);
}

/**
 * Sets up an observer to create the button when the main body is created
 * @param {Array} mutationsList - List of mutations made
 * @param {Any} observer - Observer object
 */
function mutationCallback(mutationsList, observer) {
  mutationsList.forEach((mutation) => {
    const nodes = Array.from(mutation.addedNodes);
    for (let node of nodes) {
      // Wait for the main body creation
      if (node.matches && node.matches("#ID_UM_SSS_ENRL_SCHEDULE_PGLT > div")) {
        // Check for the button group
        if (node.querySelector(".myu_btn-group")) {
          makeAddToCalendarButton();
          return;
        }
      }
    }
  });
}

// Create the mutation observer and start observing
const observer = new MutationObserver(mutationCallback);
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false,
});
