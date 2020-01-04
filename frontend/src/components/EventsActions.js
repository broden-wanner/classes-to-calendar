import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  optionsForm: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  formField: {
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(2)
  },
  extendedIcon: {
    marginRight: '4px'
  },
  infoText: {
    marginBottom: theme.spacing(1)
  }
}));

function EventsActions(props) {
  const classes = useStyles();
  const { sendToGcal, authorizeGcal, gcalClient, signedIn } = props;
  const [calOption, setCalOption] = useState('new');
  const [calList, setCalList] = useState([]);
  const [calId, setCalId] = useState('');
  const [newCalName, setNewCalName] = useState('Class Schedule');

  /**
   * Handles the switching of new and existing calendars.
   * If wanting to add to an existing calendar, on the first time
   * the option is selected, this will get the list of calendars
   * for the user
   */
  const handleOptionChange = e => {
    setCalOption(e.target.value);
    if (e.target.value === 'existing' && calList.length === 0) {
      gcalClient
        .listCalendars()
        .then(res => {
          setCalList(res.result.items);
        })
        .catch(error => {
          props.openToast(error.message, 'error');
          console.error(error);
        });
    }
  };

  /**
   * Sets the options for the calendar and calls the sendToGcal
   * method with the options.
   */
  const handleSubmit = e => {
    if (calOption === 'new') {
      if (!newCalName) {
        props.openToast('Must specify a name for the new calendar', 'error');
      } else {
        sendToGcal(calOption, newCalName, null);
      }
    } else if (calOption === 'existing') {
      if (!calId) {
        props.openToast('Must select a calendar', 'error');
      } else {
        const calendar = calList.filter(cal => cal.id === calId)[0];
        sendToGcal(calOption, null, calendar);
      }
    }
  };

  const handleCalIdChange = e => {
    setCalId(e.target.value);
  };

  const handleNewCalChange = e => {
    setNewCalName(e.target.value);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography align="left" color="textPrimary" className={classes.infoText}>
          Here are the extracted classes. Review each class's info, and edit it if any of it's
          wrong. Click the button below to make the calendar. You must authorize the app to use your
          google calendar before sending.
        </Typography>

        <div className={classes.optionsForm}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="calendarOption"
              name="calendarOption"
              defaultValue={calOption}
              onChange={handleOptionChange}
            >
              <FormControlLabel
                value="new"
                control={<Radio />}
                label="Make a new calendar"
                disabled={!signedIn}
              />
              {calOption === 'new' && (
                <TextField
                  className={classes.formField}
                  label="New calendar name"
                  variant="filled"
                  onChange={handleNewCalChange}
                  defaultValue={newCalName}
                  disabled={!signedIn}
                />
              )}
              <FormControlLabel
                value="existing"
                control={<Radio />}
                label="Add to existing calendar"
                disabled={!signedIn}
              />
              {calOption === 'existing' && (
                <FormControl className={classes.formField}>
                  <InputLabel>Select from calendars...</InputLabel>
                  <Select label="existing-calendar" defaultValue="" onChange={handleCalIdChange}>
                    {calList.map(cal => (
                      <MenuItem key={cal.id} value={cal.id}>
                        {cal.summary}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </RadioGroup>
          </FormControl>
        </div>

        <div className={classes.buttonContainer}>
          <Button onClick={authorizeGcal}>
            <TodayIcon className={classes.extendedIcon} />
            Authorize GCal
          </Button>
          <Button color="primary" onClick={handleSubmit} disabled={!signedIn}>
            <SendIcon className={classes.extendedIcon} />
            Send to GCal
          </Button>
        </div>
      </CardContent>
      {props.children}
    </Card>
  );
}

EventsActions.propTypes = {
  sendToGcal: PropTypes.func.isRequired,
  authorizeGcal: PropTypes.func.isRequired,
  gcalClient: PropTypes.object.isRequired,
  openToast: PropTypes.func.isRequired,
  signedIn: PropTypes.bool.isRequired
};

export default EventsActions;
