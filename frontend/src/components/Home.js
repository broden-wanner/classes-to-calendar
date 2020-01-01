import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  homeContent: {
    padding: theme.spacing(8, 0, 6),
    display: 'flex',
    alignItems: 'center',
    height: '100%'
  },
  homeButtons: {
    marginTop: theme.spacing(4)
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.homeContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Classes to Calendar
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            An online app that takes an screenshot of your class schedule and
            enters it in Google Calendar.
          </Typography>
          <div className={classes.homeButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/upload"
                >
                  Upload class schedule image
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}
