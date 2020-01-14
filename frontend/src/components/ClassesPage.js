import React from 'react';
import PropTypes from 'prop-types';
import UMNClass from './UMNClass';
import {
  Container,
  Typography,
  CircularProgress,
  fade,
  Card,
  CardContent,
  withStyles
} from '@material-ui/core';

import GCalClient from '../api/GCalClient';
import axios from 'axios';
import EventsActions from './EventsActions';

const styles = theme => ({
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
    borderBottomRightRadius: 0
  }
});

// Create the gcal client outside of the function so it persists
const gcalClient = new GCalClient();

class ClassesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: gcalClient.signedIn,
      eventsStatus: 'unbegun'
    };
    // Set the gcal client to set the signed in status once finished
    gcalClient.onLoadCallback = status => {
      this.setState(() => ({ signedIn: status }));
    };

    // Redirect to the home page if there are no classes
    if (this.props.extractedClasses.length === 0) {
      this.props.history.push('/');
    }
  }

  /**
   * Authorizes the user with Google Calendar through the api
   */
  authorizeGcal = () => {
    gcalClient.handleAuthClick();
  };

  /**
   * Sends the classes back to the server to serialize into events.
   * Then takes these events and adds them to the calendar.
   */
  createEvents = () => {
    // Ensure there is a calendar to add to
    if (!gcalClient.calendar) {
      this.props.openToast('A calendar must be selected', 'error');
    }

    // Make the requrest to server for the events
    let events = [];
    let eventCounter = 0;
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/api/events`, this.props.extractedClasses)
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
                this.setState(() => ({ eventsStatus: 'created' }));
                this.props.openToast('Successfully create events! Check your gcal', 'success');
              }
            })
            .catch(error => {
              this.props.openToast('Could not create event ' + event.summary, 'error');
              console.error(error);
            });
        });
      })
      .catch(error => {
        this.props.openToast(error.message, 'error');
        console.error(error);
      });
  };

  /**
   * Either creates a new calendar or sets one on the client.
   * Returns a promise for the next steps.
   */
  setCalendar = (calOption, name, calendar) => {
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
  sendToGcal = (calOption, newCalendarName, existingCalendar) => {
    this.setState(() => ({ eventsStatus: 'creating' }));
    this.setCalendar(calOption, newCalendarName, existingCalendar)
      .then(() => {
        // Add the events to the calendar once successful
        this.createEvents();
      })
      .catch(error => {
        this.props.openToast('Could not create or add to calendar.', 'error');
        console.error(error);
      });
  };

  /**
   * Sends the updated events back to the server, which converts them
   * to icalendar events. This function then creates a download.
   */
  exportCalendar = () => {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/api/ics`, this.props.extractedClasses)
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
        this.props.openToast('Could create ics file. Please try again.', 'error');
        console.error(error);
      });
  };

  render() {
    const { classes } = this.props;
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
              {this.props.extractedClasses.map(cls => (
                <UMNClass key={cls.id} cls={cls} handleClassChange={this.props.handleClassChange} />
              ))}
            </div>
            <div className={classes.actionCol}>
              <EventsActions
                sendToGcal={this.sendToGcal}
                authorizeGcal={this.authorizeGcal}
                gcalClient={gcalClient}
                exportCalendar={this.exportCalendar}
                signedIn={this.state.signedIn}
                openToast={this.props.openToast}
              >
                {this.state.eventsStatus === 'creating' && (
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
}

ClassesPage.propTypes = {
  extractedClasses: PropTypes.array.isRequired,
  handleClassChange: PropTypes.func.isRequired,
  openToast: PropTypes.func.isRequired
};

export default withStyles(styles)(ClassesPage);
