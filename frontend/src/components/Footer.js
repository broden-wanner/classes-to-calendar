import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import ErrorIcon from '@material-ui/icons/Error';
import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles(theme => ({
  footer: {
    top: 'auto',
    bottom: 0
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    color: theme.palette.grey[500]
  },
  footerLink: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}));

function Footer() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.footer}>
      <Toolbar>
        <Typography className={classes.content}>
          <Link
            href="https://github.com/broden-wanner/classes-to-calendar/issues"
            color="inherit"
            className={classes.footerLink}
          >
            <ErrorIcon className={classes.icon} />
            Issues
          </Link>
          <Link
            href="https://github.com/broden-wanner/classes-to-calendar"
            color="inherit"
            className={classes.footerLink}
          >
            <GitHubIcon className={classes.icon} />
            Github repo
          </Link>
          <Link
            href="mailto:broden.wanner@outlook.com"
            color="inherit"
            className={classes.footerLink}
          >
            <HelpIcon className={classes.icon} />
            Contact
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
