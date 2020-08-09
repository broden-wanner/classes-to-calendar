import React, { useState } from "react";
import { makeStyles, Divider, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
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
  Typography,
} from "@material-ui/core";
import TodayIcon from "@material-ui/icons/Today";
import SendIcon from "@material-ui/icons/Send";
import GetAppIcon from "@material-ui/icons/GetApp";
import { addDays } from "date-fns";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    marginBottom: theme.spacing(1),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  optionsForm: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  formField: {
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: "4px",
  },
  infoText: {
    marginBottom: theme.spacing(1),
  },
  actionSection: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(2),
    "&:last-child": {
      marginBottom: 0,
    },
    "&:first-child": {
      marginTop: 0,
    },
  },
  datePicker: {
    flex: 1,
    "&:last-child": {
      marginLeft: theme.spacing(2),
    },
  },
}));

function EventsActions(props) {
  const classes = useStyles();
  const {
    sendToGcal,
    authorizeGcal,
    gcalClient,
    signedIn,
    exportCalendar,
  } = props;
  const [calOption, setCalOption] = useState("new");
  const [calList, setCalList] = useState([]);
  const [calId, setCalId] = useState("");
  const [newCalName, setNewCalName] = useState("Class Schedule");
  const [classStartDate, setClassStartDate] = useState(new Date());
  const [classEndDate, setClassEndDate] = useState(addDays(new Date(), 100));

  /**
   * Handles the switching of new and existing calendars.
   * If wanting to add to an existing calendar, on the first time
   * the option is selected, this will get the list of calendars
   * for the user
   */
  const handleOptionChange = (e) => {
    setCalOption(e.target.value);
    if (e.target.value === "existing" && calList.length === 0) {
      gcalClient
        .listCalendars()
        .then((res) => {
          setCalList(res.result.items);
        })
        .catch((error) => {
          props.openToast("Could not retrieve your calendar list.", "error");
          console.error(error);
        });
    }
  };

  /**
   * Sets the options for the calendar and calls the sendToGcal
   * method with the options.
   */
  const handleSubmit = (e) => {
    if (calOption === "new") {
      if (!newCalName) {
        props.openToast("Must specify a name for the new calendar", "error");
      } else {
        sendToGcal(calOption, newCalName, null);
      }
    } else if (calOption === "existing") {
      if (!calId) {
        props.openToast("Must select a calendar", "error");
      } else {
        const calendar = calList.filter((cal) => cal.id === calId)[0];
        sendToGcal(calOption, null, calendar);
      }
    }
  };

  const handleCalIdChange = (e) => {
    setCalId(e.target.value);
  };

  const handleNewCalChange = (e) => {
    setNewCalName(e.target.value);
  };

  const handleStartDateChange = (date) => {
    setClassStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setClassEndDate(date);
  };

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.actionSection}>
            <Typography variant="h6" component="h6">
              Select Date Range
            </Typography>
            <p className={classes.infoText}>
              Range for the class dates. Defaults to the current UMN term.
            </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-between">
                <KeyboardDatePicker
                  className={classes.datePicker}
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  label="Start date"
                  value={classStartDate}
                  onChange={handleStartDateChange}
                  KeyboardButtonProps={{ "aria-label": "change date" }}
                ></KeyboardDatePicker>
                <KeyboardDatePicker
                  className={classes.datePicker}
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  label="End date"
                  value={classEndDate}
                  onChange={handleEndDateChange}
                  KeyboardButtonProps={{ "aria-label": "change date" }}
                ></KeyboardDatePicker>
              </Grid>
            </MuiPickersUtilsProvider>
          </div>

          <Divider />

          <div className={classes.actionSection}>
            <Typography variant="h6" component="h6">
              Add to Google Calendar
            </Typography>
            <p className={classes.infoText}>
              You can add your classes to Google Calendar by either making a new
              calendar or adding them to an existing one. You must authorize
              GCal in order to do this.
            </p>

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
                  {calOption === "new" && (
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
                  {calOption === "existing" && (
                    <FormControl
                      className={classes.formField}
                      style={{ width: "300px" }}
                    >
                      <InputLabel>Select from calendars...</InputLabel>
                      <Select
                        label="existing-calendar"
                        defaultValue=""
                        onChange={handleCalIdChange}
                        style={{ width: "300px" }}
                      >
                        {calList.map((cal) => (
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
              <Button
                color="primary"
                onClick={handleSubmit}
                disabled={!signedIn}
              >
                <SendIcon className={classes.extendedIcon} />
                Send to GCal
              </Button>
            </div>
          </div>

          <Divider />
          {props.children}

          <div className={classes.actionSection}>
            <Typography variant="h6" component="h6">
              Export to Another Calendar
            </Typography>
            <p className={classes.infoText}>
              You can also export your classes to another calendar by clicking
              the export button. This will download a file that you can import
              to any other calendar service.
            </p>
            <div className={classes.buttonContainer}>
              <Button color="primary" onClick={exportCalendar}>
                <GetAppIcon className={classes.extendedIcon} />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

EventsActions.propTypes = {
  sendToGcal: PropTypes.func.isRequired,
  authorizeGcal: PropTypes.func.isRequired,
  gcalClient: PropTypes.object.isRequired,
  exportCalendar: PropTypes.func.isRequired,
  openToast: PropTypes.func.isRequired,
  signedIn: PropTypes.bool.isRequired,
};

export default EventsActions;
