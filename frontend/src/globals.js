const env = process.env.REACT_APP_ENV;

// Get the API url for the environment
let envApiUrl = "";
if (env === "production") {
  envApiUrl = `${process.env.REACT_APP_DOMAIN_PROD}/api/v1`;
} else if (env === "staging") {
  envApiUrl = `${process.env.REACT_APP_DOMAIN_STAG}/api/v1`;
} else {
  envApiUrl = `${process.env.REACT_APP_DOMAIN_DEV}/api/v1`;
}
const apiUrl = envApiUrl;
const appName = process.env.REACT_APP_NAME;

// Object to hold global settings variables used throughout the frontend
const globals = {
  defaultStartDate: new Date(2021, 8, 7),
  defaultEndDate: new Date(2021, 11, 15),
  currentTerm: "Fall 2021",
  apiUrl: apiUrl,
  name: appName,
};
Object.freeze(globals);

export default globals;
