import React from 'react';
import PropTypes from 'prop-types';
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
  },
  navLink: {
    marginLeft: theme.spacing(2)
  }
}));

function Navbar(props) {
  const classes = useStyles();
  const history = useHistory();
  const { openInstructions } = props;

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h5" className={classes.titleWrapper}>
          <span onClick={() => history.push('/')} className={classes.title}>
            Classes to Calendar
          </span>
        </Typography>
        <Button
          color="inherit"
          className={classes.navLink}
          component={Link}
          to="/upload"
          onClick={openInstructions}
        >
          Upload
        </Button>
        <Button color="inherit" className={classes.navLink} onClick={openInstructions}>
          Instructions
        </Button>
        <Button
          href="https://github.com/broden-wanner/classes-to-calendar/issues"
          color="inherit"
          className={classes.navLink}
        >
          Issues
        </Button>
        <Button
          href="https://github.com/broden-wanner/classes-to-calendar"
          color="inherit"
          className={classes.navLink}
        >
          Github repo
        </Button>
        <Button href="mailto:broden.wanner@outlook.com" color="inherit" className={classes.navLink}>
          Contact
        </Button>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  openInstructions: PropTypes.func.isRequired
};

export default Navbar;
