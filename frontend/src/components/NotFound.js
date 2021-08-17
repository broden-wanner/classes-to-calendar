import React from "react";
import { makeStyles, Typography, Card, Container, Grid, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    width: "100%",
    overflow: "auto",
  },
  content: {
    marginTop: "10vh",
    paddingBottom: "5vh",
  },
  card: {
    marginBottom: "10vh",
    padding: theme.spacing(2),
  },
}));

export default function NotFound() {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Container className={classes.content}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container justifyContent="space-between">
              <Typography variant="h2" component="h2" align="center">
                Not Found :(
              </Typography>
            </Grid>
            <Typography>
              Go to the <Link to="/">home page</Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
