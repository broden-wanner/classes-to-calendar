import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core";
import "./App.css";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import Toast from "./components/Toast";
import ClassesPage from "./pages/ClassesPage";
import InstructionDialog from "./components/InstructionDialog";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import NotFound from "./components/NotFound";

const appTheme = createTheme({
  palette: {
    primary: {
      light: "#913447",
      main: "#760219",
      dark: "#520111",
      contrastText: "#fff",
    },
    secondary: {
      light: "#FFDF7E",
      main: "#FFD75E",
      dark: "#b29641",
      contrastText: "#000",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  background: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    background: 'url("gopher.jpg") no-repeat center center fixed',
    backgroundSize: "cover",
  },
}));

// Get the json courses if they are in the query parameters
let queryCourses = [];
if ("URLSearchParams" in window) {
  const searchParams = new URLSearchParams(window.location.search);
  let queryString = searchParams.get("course_json");
  try {
    queryString = decodeURIComponent(queryString);
    queryCourses = JSON.parse(queryString);
  } catch (e) {
    queryCourses = [];
  }
  if (!queryString) {
    queryCourses = [];
  }
}
queryCourses = queryCourses ? queryCourses : [];

// Get the stashed courses
let stashedCourses = JSON.parse(localStorage.getItem("extractedClasses"));
stashedCourses = stashedCourses ? stashedCourses : [];

function App() {
  const classes = useStyles();
  // Attempt to get the local classes on init
  const [extractedClasses, setExtractedClasses] = useState(queryCourses.length > 0 ? queryCourses : stashedCourses);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("error");
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  useEffect(() => {
    // Set the extracted classes locally on any change
    localStorage.setItem("extractedClasses", JSON.stringify(extractedClasses));
  }, [extractedClasses]);

  /**
   * Function to be passed to the upload component to set the classes on the app
   */
  const handleExtractedClasses = (data) => {
    setExtractedClasses(data);
  };

  /**
   * Passed to the UMNClass component to handle the editing of classes. Simply
   * replaces the class in the extracted classes array with the argument class
   */
  const handleClassChange = (cls) => {
    const i = extractedClasses.indexOf(cls);
    extractedClasses.splice(i, 1, cls);
    setExtractedClasses([...extractedClasses]);
  };

  /**
   * Adds a new empty class to the list of extracted classes
   */
  const handleClassAdd = () => {
    const newClass = {
      name: "Class Name",
      dept: "",
      course_num: "",
      section: "",
      location: "",
      start_time: "",
      end_time: "",
      start_date: "",
      end_date: "",
      days_of_week: "",
      id: extractedClasses.length + 1,
    };
    setExtractedClasses([...extractedClasses, newClass]);
  };

  /**
   * Deletes a class from the extractedClasses array
   * @param {object} cls - class object to delete
   */
  const handleClassDelete = (cls) => {
    const i = extractedClasses.indexOf(cls);
    extractedClasses.splice(i, 1);
    setExtractedClasses([...extractedClasses]);
    handleToastOpen("Class deleted", "success");
  };

  /**
   * Closes the toast message
   */
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
  };

  /**
   * Opens the toast with a message and a color variant
   * @param {string} - message
   * @param {string} - variant (one of sucess, info, warning, or error)
   */
  const handleToastOpen = (message, variant) => {
    setToastOpen(true);
    setToastMessage(message);
    setToastVariant(variant);
  };

  /**
   * Simply opens the instructions modal
   */
  const handleInstructionsOpen = () => {
    setInstructionsOpen(true);
  };

  /**
   * Simply closes the instructions modal
   */
  const handleInstructionsClose = () => {
    setInstructionsOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={appTheme}>
        <div className={classes.background}>
          <Router>
            <Navbar openInstructions={handleInstructionsOpen} extractedClasses={extractedClasses}></Navbar>
            <Switch>
              <Route exact path="/">
                <HomePage openInstructions={handleInstructionsOpen} />
              </Route>
              <Route exact path="/upload">
                <UploadPage openToast={handleToastOpen} handleClasses={handleExtractedClasses} />
              </Route>
              <Route exact path="/classes">
                <ClassesPage
                  extractedClasses={extractedClasses}
                  handleClassChange={handleClassChange}
                  handleClassAdd={handleClassAdd}
                  handleClassDelete={handleClassDelete}
                  openToast={handleToastOpen}
                />
              </Route>
              <Route exact path="/privacy-policy">
                <PrivacyPolicyPage />
              </Route>
              <Route exact path="/contact">
                <ContactPage />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
            <Footer />
          </Router>

          <InstructionDialog open={instructionsOpen} onClose={handleInstructionsClose} />
          <Toast open={toastOpen} handleClose={handleToastClose} message={toastMessage} variant={toastVariant} />
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
