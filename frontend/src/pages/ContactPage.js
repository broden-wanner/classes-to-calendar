import React from 'react';
import { Card, CardContent, Typography, Container, makeStyles, Link } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  page: {
    display: 'flex',
    width: '100%',
    overflow: 'auto'
  },
  content: {
    marginTop: '10vh',
    paddingBottom: '5vh',
    '& p': {
      marginBottom: theme.spacing(3)
    }
  },
  title: {
    marginBottom: theme.spacing(5)
  },
  email: {
    fontWeight: 'bold'
  },
  card: {
    marginBottom: '10vh',
    padding: theme.spacing(2)
  }
}));

function ContactPage() {
  const classes = useStyle();

  return (
    <div className={classes.page}>
      <Container className={classes.content} maxWidth="md">
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h2" component="h2" className={classes.title}>
              Contact
            </Typography>
            <Typography>
              If you are having issues or would like to contribute, you can access the{' '}
              <Link target="blank" href="https://github.com/broden-wanner/classes-to-calendar">
                GitHub repository.
              </Link>{' '}
              For issues, go to the issues tab of the project and file an issue. For other
              questions, send an email to the following address:
            </Typography>
            <Typography className={classes.email}>
              Email: <Link href="mailto:wanne036@umn.edu">wanne036@umn.edu</Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default ContactPage;
