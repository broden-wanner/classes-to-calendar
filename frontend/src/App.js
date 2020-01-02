import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import Upload from './components/Upload';
import Toast from './components/Toast';
import ClassesPage from './components/ClassesPage';

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
  const [extractedClasses, setExtractedClasses] = useState({});
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('error');

  const handleExtractedClasses = data => {
    setExtractedClasses(data);
    console.log(data);
  };

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
  };

  const handleToastOpen = (message, variant) => {
    setToastOpen(true);
    setToastMessage(message);
    setToastVariant(variant);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={appTheme}>
        <div className={classes.background}>
          <Router>
            <Navbar></Navbar>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/upload">
              <Upload openToast={handleToastOpen} handleClasses={handleExtractedClasses} />
            </Route>
            <Route exact path="/classes">
              <ClassesPage />
            </Route>
            <Toast
              open={toastOpen}
              handleClose={handleToastClose}
              message={toastMessage}
              variant={toastVariant}
            />
          </Router>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
