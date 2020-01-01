import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  }
}));

function Navbar() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Classes to Calendar
          </Typography>
          <Button color="inherit">Upload Class Calendar</Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Navbar;
