import React from "react";
import PropTypes from "prop-types";

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
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  content: {
    maxWidth: "960px",
    width: "100%",
  },
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
              Go to myu.umn.edu, click on academics, and go to the 'My Classes'
              tab.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Typography>2.</Typography>
            </ListItemIcon>
            <ListItemText>
              Click to a week where all the classes appear. (If the first week
              doesn't have classes on Monday for instance, go to the second week
              so the Monday classes can be seen.)
            </ListItemText>
          </ListItem>

          <ListItem style={{ display: "text", justifyContent: "center" }}>
            <img
              src="example-calendar.png"
              height="300"
              alt="Example Calendar"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Typography>3.</Typography>
            </ListItemIcon>
            <ListItemText>
              Right-click somewhere on the webpage and click "Save As..." to
              save the html file somewhere you'll rememeber. (This will also
              download an extra folder that you can delete. All you need is the
              .html file)
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Typography>4.</Typography>
            </ListItemIcon>
            <ListItemText>
              Drag and drop the html file here or select from your files by
              clicking on the upload zone.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Typography>5.</Typography>
            </ListItemIcon>
            <ListItemText>
              Once your html file is chosen, select the dates you would like the
              classes to be added with the date picker. The start and end dates
              default to the current UMN term dates.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Typography>6.</Typography>
            </ListItemIcon>
            <ListItemText>
              Once your html file is chose, click the "Upload" button, and wait
              for the classes to be read.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Typography>7.</Typography>
            </ListItemIcon>
            <ListItemText>
              After the classes have been loaded, correct any data that is wrong
              on the next screen by clicking the class and directly editing it.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Typography>8.</Typography>
            </ListItemIcon>
            <ListItemText>
              Authorize the app to use your Google Calendar, and set your
              calendar creation options. Then submit and voilà.
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
  onClose: PropTypes.func.isRequired,
};

export default InstructionDialog;
