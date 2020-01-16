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
    display: 'inline-flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  navLink: {
    marginLeft: theme.spacing(2)
  },
  logo: {
    height: '24px',
    paddingRight: '8px'
  }
}));

function Navbar(props) {
  const classes = useStyles();
  const history = useHistory();
  const { openInstructions, extractedClasses } = props;

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h5" className={classes.titleWrapper}>
          <span onClick={() => history.push('/')} className={classes.title}>
            <img className={classes.logo} src="/logo.png" alt="Logo png" />
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
        {extractedClasses.length > 0 && (
          <Button color="inherit" className={classes.navLink} component={Link} to="/classes">
            Classes
          </Button>
        )}
        <Button color="inherit" className={classes.navLink} onClick={openInstructions}>
          Instructions
        </Button>
        <Button
          target="blank"
          href="https://github.com/broden-wanner/classes-to-calendar/issues"
          color="inherit"
          className={classes.navLink}
        >
          Issues
        </Button>
        <Button
          target="blank"
          href="https://github.com/broden-wanner/classes-to-calendar"
          color="inherit"
          className={classes.navLink}
        >
          Github repo
        </Button>
        <Button color="inherit" className={classes.navLink} component={Link} to="/contact">
          Contact
        </Button>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  openInstructions: PropTypes.func.isRequired,
  extractedClasses: PropTypes.array.isRequired
};

export default Navbar;
