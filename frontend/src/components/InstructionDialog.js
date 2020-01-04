import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  DialogContent,
  Typography,
  DialogActions,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  content: {
    maxWidth: '960px',
    width: '100%'
  }
}));

function InstructionDialog(props) {
  const classes = useStyles();
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle id="simple-dialog-title">How To</DialogTitle>
      <DialogContent className={classes.content}>
        <List component="nav" dense>
          <ListItem>
            <ListItemIcon>
              <Typography>1.</Typography>
            </ListItemIcon>
            <ListItemText>
              Go to myu.umn.edu, click on academics, and go to the 'My Classes' tab.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Typography>2.</Typography>
            </ListItemIcon>
            <ListItemText>
              Click to a week where all the classes appear. (If the first week doesn't have classes
              on Monday for instance, go to the second week so the Monday classes can be seen.)
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Typography>3.</Typography>
            </ListItemIcon>
            <ListItemText>
              Take a screenshot of the entire schedule and save it locally. Make sure the days of
              the week at the top of each column are in the screenshot.
            </ListItemText>
          </ListItem>
          <ListItem style={{ display: 'text', justifyContent: 'center' }}>
            <img src="example-calendar.png" height="400" alt="Example Calendar" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Typography>4.</Typography>
            </ListItemIcon>
            <ListItemText>Upload the image here and wait for the classes to be read.</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Typography>5.</Typography>
            </ListItemIcon>
            <ListItemText>
              After the classes have been loaded, correct any data that is wrong by clicking the
              class and directly editing it.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Typography>6.</Typography>
            </ListItemIcon>
            <ListItemText>
              Authorize the app to use your Google Calendar, and set your calendar creation options.
              Then submit and voilà.
            </ListItemText>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

InstructionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default InstructionDialog;
