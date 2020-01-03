import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';

import Navbar from './components/Navbar';
import Home from './components/Home';
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
  const [extractedClasses, setExtractedClasses] = useState([
    {
      name: 'Algs. & Data Str. Discussion',
      dept: 'CSCI',
      course_num: '4041',
      section: '002',
      location: 'Akerman Hall 225',
      start_time: '09:05:00',
      end_time: '09:55:00',
      start_date: '2020-01-24',
      end_date: '2020-05-04',
      days_of_week: 'FRIDAY',
      id: 'CSCI4041002'
    },
    {
      name: 'Algs. & Data Str. Lecture',
      dept: 'CSCI',
      course_num: '4041',
      section: '001',
      location: '10 Church Street SE 100',
      start_time: '13:00:00',
      end_time: '14:15:00',
      start_date: '2020-01-21',
      end_date: '2020-05-04',
      days_of_week: 'TUESDAY, THURSDAY',
      id: 'CSCI4041001'
    },
    {
      name: 'Ear-Training II Lecture',
      dept: 'MUS',
      course_num: '1512',
      section: '001',
      location: 'Ferguson Hall 225',
      start_time: '08:00:00',
      end_time: '08:50:00',
      start_date: '2020-01-27',
      end_date: '2020-05-04',
      days_of_week: 'MONDAY',
      id: 'MUS1512001'
    },
    {
      name: 'Ear-Training Il Discussion',
      dept: 'MUS',
      course_num: '1512',
      section: '002',
      location: 'Ferguson Hall 115',
      start_time: '09:05:00',
      end_time: '09:55:00',
      start_date: '2020-01-22',
      end_date: '2020-05-04',
      days_of_week: 'WEDNESDAY',
      id: 'MUS1512002'
    },
    {
      name: 'Intro to Operating Systems Laboratory',
      dept: 'CSCI',
      course_num: '4061',
      section: '015',
      location: 'Keller Hall 1-250',
      start_time: '17:45:00',
      end_time: '18:35:00',
      start_date: '2020-01-27',
      end_date: '2020-05-04',
      days_of_week: 'MONDAY',
      id: 'CSCI4061015'
    },
    {
      name: 'Intro to Operating Systems Lecture',
      dept: 'CSCI',
      course_num: '4061',
      section: '010',
      location: 'Fraser Hall 101',
      start_time: '11:15:00',
      end_time: '12:30:00',
      start_date: '2020-01-21',
      end_date: '2020-05-04',
      days_of_week: 'TUESDAY, THURSDAY',
      id: 'CSCI4061010'
    },
    {
      name: 'Intro to Prob&Stat Laboratory',
      dept: 'STAT',
      course_num: '3021',
      section: '010',
      location: 'Amundson Hall 120',
      start_time: '10:10:00',
      end_time: '11:00:00',
      start_date: '2020-01-23',
      end_date: '2020-05-04',
      days_of_week: 'THURSDAY',
      id: 'STAT3021010'
    },
    {
      name: 'Intro to Prob&Stat Lecture',
      dept: 'STAT',
      course_num: '3021',
      section: '009',
      location: 'Tate Hall B20',
      start_time: '10:10:00',
      end_time: '11:00:00',
      start_date: '2020-01-22',
      end_date: '2020-05-04',
      days_of_week: 'MONDAY, WEDNESDAY, FRIDAY',
      id: 'STAT3021009'
    },
    {
      name: 'Intro: Artificial Intelligence Lecture',
      dept: 'CSCI',
      course_num: '4511W',
      section: '002',
      location: 'Bruininks Hall 220',
      start_time: '16:00:00',
      end_time: '17:15:00',
      start_date: '2020-01-22',
      end_date: '2020-05-04',
      days_of_week: 'MONDAY, WEDNESDAY',
      id: 'CSCI4511W002'
    },
    {
      name: 'Music Theory II Discussion',
      dept: 'MUS',
      course_num: '1502',
      section: '002',
      location: 'Ferguson Hall 115',
      start_time: '09:05:00',
      end_time: '09:55:00',
      start_date: '2020-01-27',
      end_date: '2020-05-04',
      days_of_week: 'MONDAY',
      id: 'MUS1502002'
    },
    {
      name: 'Music Theory II Lecture',
      dept: 'MUS',
      course_num: '1502',
      section: '001',
      location: 'Ferguson Hall 225',
      start_time: '08:00:00',
      end_time: '08:50:00',
      start_date: '2020-01-22',
      end_date: '2020-05-04',
      days_of_week: 'WEDNESDAY, FRIDAY',
      id: 'MUS1502001'
    },
    {
      name: 'University Bands Laboratory',
      dept: 'MUS',
      course_num: '3410',
      section: '001',
      location: 'Ferguson Hall 95',
      start_time: '13:25:00',
      end_time: '15:20:00',
      start_date: '2020-01-22',
      end_date: '2020-05-04',
      days_of_week: 'MONDAY, WEDNESDAY, FRIDAY',
      id: 'MUS3410001'
    }
  ]);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('error');

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
            <Navbar></Navbar>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/upload">
              <Upload openToast={handleToastOpen} handleClasses={handleExtractedClasses} />
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
          </Router>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
