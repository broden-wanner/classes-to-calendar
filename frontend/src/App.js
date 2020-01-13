import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import UploadPage from './components/UploadPage';
import Toast from './components/Toast';
import ClassesPage from './components/ClassesPage';
import InstructionDialog from './components/InstructionDialog';

const appTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#913447',
      main: '#760219',
      dark: '#520111',
      contrastText: '#fff'
    },
    secondary: {
      light: '#FFDF7E',
      main: '#FFD75E',
      dark: '#b29641',
      contrastText: '#000'
    }
  }
});

const useStyles = makeStyles(theme => ({
  background: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    background: 'url("gopher.jpg") no-repeat center center fixed',
    backgroundSize: 'cover'
  }
}));

function App() {
  const classes = useStyles();
  const [extractedClasses, setExtractedClasses] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('error');
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  /**
   * Function to be passed to the upload component to set the classes on the app
   */
  const handleExtractedClasses = data => {
    setExtractedClasses(data);
  };

  /**
   * Passed to the UMNClass component to handle the editing of classes. Simply
   * replaces the class in the extracted classes array with the argument class
   */
  const handleClassChange = cls => {
    const i = extractedClasses.indexOf(cls);
    extractedClasses.splice(i, 1, cls);
    setExtractedClasses(extractedClasses);
  };

  /**
   * Closes the toast message
   */
  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
  };

  /**
   * Opens the toast with a message and a color variant
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

  /**
   * Generates a route component that will only be rendered if there are classes
   */
  const ClassesRequiredRoute = ({ component, children, ...rest }) => (
    <Route {...rest}>{extractedClasses.length !== 0 ? children : <Redirect to="/" />}</Route>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={appTheme}>
        <div className={classes.background}>
          <Router>
            <Navbar openInstructions={handleInstructionsOpen}></Navbar>
            <Route exact path="/">
              <HomePage openInstructions={handleInstructionsOpen} />
            </Route>
            <Route exact path="/upload">
              <UploadPage openToast={handleToastOpen} handleClasses={handleExtractedClasses} />
            </Route>
            <ClassesRequiredRoute exact path="/classes">
              <ClassesPage
                extractedClasses={extractedClasses}
                handleClassChange={handleClassChange}
                openToast={handleToastOpen}
              />
            </ClassesRequiredRoute>
            <Toast
              open={toastOpen}
              handleClose={handleToastClose}
              message={toastMessage}
              variant={toastVariant}
            />
            <InstructionDialog open={instructionsOpen} onClose={handleInstructionsClose} />
          </Router>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
