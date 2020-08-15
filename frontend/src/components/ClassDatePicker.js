import React from "react";
import PropTypes from "prop-types";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  datePicker: {
    flex: 1,
  },
  datePickerContainer: {
    flexDirection: "column",
  },
}));

function ClassDatePicker(props) {
  const classes = useStyles();
  const { startDate, onStartDateChange, endDate, onEndDateChange } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container className={classes.datePickerContainer}>
        <KeyboardDatePicker
          className={classes.datePicker}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          label="Start date"
          value={startDate}
          onChange={onStartDateChange}
          KeyboardButtonProps={{ "aria-label": "change date" }}
        ></KeyboardDatePicker>
        <KeyboardDatePicker
          className={classes.datePicker}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          label="End date"
          value={endDate}
          onChange={onEndDateChange}
          KeyboardButtonProps={{ "aria-label": "change date" }}
        ></KeyboardDatePicker>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

ClassDatePicker.propTypes = {
  startDate: PropTypes.any.isRequired,
  onStartDateChange: PropTypes.func.isRequired,
  endDate: PropTypes.any.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
};

export default ClassDatePicker;
