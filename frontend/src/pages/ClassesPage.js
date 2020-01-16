import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UMNClass from '../components/UMNClass';
import {
  Container,
  Typography,
  CircularProgress,
  fade,
  Card,
  CardContent,
  makeStyles,
  Fab
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import GCalClient from '../api/GCalClient';
import axios from 'axios';
import EventsActions from '../components/EventsActions';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  classesPage: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    overflow: 'auto'
  },
  loadingOverlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
    width: '100%',
    height: '100%',
    borderRadius: '4px',
    backgroundColor: fade(theme.palette.grey[900], 0.4)
  },
  content: {
    height: 'max-content',
    marginTop: '10vh',
    marginBottom: '10vh'
  },
  classesContainer: {
    display: 'flex'
  },
  classList: {
    textAlign: 'center',
    flex: 3
  },
  actionCol: {
    flex: 2,
    position: 'relative',
    marginLeft: theme.spacing(1)
  },
  header: {
    color: theme.palette.grey[50],
    marginBottom: theme.spacing(2)
  },
  classesInfo: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    textAlign: 'left'
  },
  fabButton: {
    position: 'relative',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto'
  }
}));

// Create the gcal client outside of the function so it persists
const gcalClient = new GCalClient();

function ClassesPage(props) {
  const classes = useStyles();
  const [signedIn, setSignedIn] = useState(gcalClient.signedIn);
  const [eventsStatus, setEventsStatus] = useState('unbegun');

  // Set the gcal client to set the signed in status once finished
  gcalClient.onLoadCallback = status => {
    setSignedIn(status);
  };

  // Redirect to homepage if there are no classes
  if (props.extractedClasses.length === 0) {
    return <Redirect to="/" />;
  }

  /**
   * Authorizes the user with Google Calendar through the api
   */
  const authorizeGcal = () => {
    gcalClient.handleAuthClick();
  };

  /**
   * Sends the classes back to the server to serialize into events.
   * Then takes these events and adds them to the calendar.
   */
  const createEvents = () => {
    // Ensure there is a calendar to add to
    if (!gcalClient.calendar) {
      props.openToast('A calendar must be selected', 'error');
    }

    // Make the requrest to server for the events
    let events = [];
    let eventCounter = 0;
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/api/events`, props.extractedClasses)
      .then(res => {
        events = res.data;
        // Add each event to the calendar on the gcalClient
        events.forEach(event => {
          gcalClient
            .createEvent(event)
            .then(res => {
              eventCounter++;
              // Check to see if the last event has been created
              if (eventCounter === events.length) {
                setEventsStatus('created');
                props.openToast('Successfully create events! Check your gcal', 'success');
              }
            })
            .catch(error => {
              props.openToast('Could not create event ' + event.summary, 'error');
              console.error(error);
            });
        });
      })
      .catch(error => {
        props.openToast(error.message, 'error');
        setEventsStatus('error');
        console.error(error);
      });
  };

  /**
   * Either creates a new calendar or sets one on the client.
   * Returns a promise for the next steps.
   */
  const setCalendar = (calOption, name, calendar) => {
    if (calOption === 'new') {
      // Create a new calendar with the api
      if (!name) {
        return new Promise((resolve, reject) => reject());
      }
      return gcalClient.createCalendar(name);
    } else if (calOption === 'existing') {
      // Set the calendar
      if (!calendar) {
        return new Promise((resolve, reject) => reject());
      }
      return new Promise((resolve, reject) => {
        gcalClient.setCalendar(calendar);
        resolve();
      });
    }
  };

  /**
   * Sends the updates events back to the server. Then creates a
   * new calendar on gcal (or selects an existing one) and adds
   * the events to there. Will not work if the user has not authorized
   * Gcal.
   */
  const sendToGcal = (calOption, newCalendarName, existingCalendar) => {
    setEventsStatus('creating');
    setCalendar(calOption, newCalendarName, existingCalendar)
      .then(() => {
        // Add the events to the calendar once successful
        createEvents();
      })
      .catch(error => {
        props.openToast('Could not create or add to calendar.', 'error');
      });
  };

  /**
   * Sends the updated events back to the server, which converts them
   * to icalendar events. This function then creates a download.
   */
  const exportCalendar = () => {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/api/ics`, props.extractedClasses)
      .then(res => {
        const icsString = res.data.ics;
        // Create an invisible link element to download the file
        var element = document.createElement('a');
        element.setAttribute(
          'href',
          'data:text/calendar;charset=utf-8,' + encodeURIComponent(icsString)
        );
        element.setAttribute('download', 'class-calendar.ics');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      })
      .catch(error => {
        props.openToast('Could create ics file. Please try again.', 'error');
        console.error(error);
      });
  };

  return (
    <div className={classes.classesPage}>
      <Container className={classes.content}>
        <Container className={classes.header}>
          <Typography variant="h2" align="center" component="h1" color="inherit">
            Review Classes
          </Typography>
        </Container>
        <Container className={classes.classesContainer}>
          <div className={classes.classList}>
            <Card className={classes.classesInfo}>
              <CardContent style={{ paddingBottom: '16px' }}>
                The classes extracted from your screenshot are below. Review and edit the info for
                each class by clicking on it and changing anything that's incorrect.
              </CardContent>
            </Card>
            {props.extractedClasses.map(cls => (
              <UMNClass
                key={cls.id}
                cls={cls}
                handleClassChange={props.handleClassChange}
                handleClassDelete={props.handleClassDelete}
              />
            ))}
            <Fab color="primary" className={classes.fabButton} onClick={props.handleClassAdd}>
              <AddIcon />
            </Fab>
          </div>
          <div className={classes.actionCol}>
            <EventsActions
              sendToGcal={sendToGcal}
              authorizeGcal={authorizeGcal}
              gcalClient={gcalClient}
              exportCalendar={exportCalendar}
              signedIn={signedIn}
              openToast={props.openToast}
            >
              {eventsStatus === 'creating' && (
                <div className={classes.loadingOverlay}>
                  <CircularProgress />
                </div>
              )}
            </EventsActions>
          </div>
        </Container>
      </Container>
    </div>
  );
}

ClassesPage.propTypes = {
  extractedClasses: PropTypes.array.isRequired,
  handleClassChange: PropTypes.func.isRequired,
  handleClassAdd: PropTypes.func.isRequired,
  handleClassDelete: PropTypes.func.isRequired,
  openToast: PropTypes.func.isRequired
};

export default ClassesPage;
