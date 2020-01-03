import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  titleWrapper: {
    flexGrow: 1
  },
  title: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

function Navbar() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h5" className={classes.titleWrapper}>
          <span onClick={() => history.push('/')} className={classes.title}>
            Classes to Calendar
          </span>
        </Typography>
        <Button variant="outlined" color="inherit" component={Link} to="/upload">
          Upload Class Calendar
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
