import React from 'react';
import { makeStyles, Card, CardContent, Typography } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles(theme => ({
  pageContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  successCard: {
    maxWidth: '800px',
    maxHeight: '400px',
    width: '100%',
    padding: '50px',
    backgroundColor: theme.palette.success.main
  },
  successContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  successIcon: {
    fontSize: '120px',
    marginBottom: theme.spacing(2),
    color: theme.palette.grey[200]
  },
  successText: {
    color: theme.palette.grey[200]
  }
}));

function SuccessPage() {
  const classes = useStyles();

  return (
    <div className={classes.pageContent}>
      <Card className={classes.successCard}>
        <CardContent className={classes.successContent}>
          <CheckCircleOutlineIcon className={classes.successIcon} />
          <Typography variant="h1" component="h1" className={classes.successText}>
            Success
          </Typography>
          <Typography className={classes.successText}>Check your Google Calendar</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default SuccessPage;
