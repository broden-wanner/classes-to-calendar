"use strict";

// Set the correct browser
let extensionsAPI;
if (typeof chrome !== 'undefined') {
  // Chrome, Edge, Opera
  extensionsAPI = chrome;
} else {
  // Firefox
  extensionsAPI = browser;
}

// Add a listener to show the page action when the host is correct
extensionsAPI.runtime.onInstalled.addListener(() => {
  extensionsAPI.declarativeContent.onPageChanged.removeRules(undefined, function () {
    extensionsAPI.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new extensionsAPI.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "www.myu.umn.edu", schemes: ['https', 'http'] },
          }),
        ],
        actions: [new extensionsAPI.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});
