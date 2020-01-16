import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  homeContent: {
    padding: theme.spacing(8, 0, 6),
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  homeButtons: {
    marginTop: theme.spacing(4)
  },
  card: {
    padding: '50px'
  }
}));

export default function HomePage(props) {
  const classes = useStyles();
  const { openInstructions } = props;

  return (
    <React.Fragment>
      <div className={classes.homeContent}>
        <Container maxWidth="md">
          <Card className={classes.card}>
            <CardContent>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Classes to Calendar
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                An online app that takes the html file of your class schedule and enters it in
                Google Calendar, or you can export it to whatever calendar you want.
              </Typography>
              <div className={classes.homeButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to="/upload"
                      onClick={openInstructions}
                    >
                      Upload class schedule html file
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
}
