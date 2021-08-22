import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";

const useStyles = makeStyles((theme) => ({
  homeContent: {
    padding: theme.spacing(8, 0, 6),
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  homeButtons: { marginBottom: 14 },
  card: {
    padding: "50px",
  },
  logo: {
    paddingLeft: theme.spacing(1),
  },
  title: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    maxWidth: "30%",
    border: "none",
    height: "2px",
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    marginBottom: 14,
  },
  text: {
    fontSize: 22,
    textAlign: "center",
  },
  extensionIcon: {
    marginLeft: theme.spacing(1),
    marginRight: 0,
  },
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
                className={classes.title}
              >
                UMN Classes to Calendar
                <img className={classes.logo} src="/logo.png" alt="Logo png" height="100" />
              </Typography>
              <Typography variant="h5" align="left" color="textSecondary" paragraph className={classes.text}>
                An online app that takes your UMN class schedule and enters it in Google Calendar, and you can export it
                to whatever calendar you want.
              </Typography>
              <hr className={classes.divider} />
              <Typography variant="h5" align="center" color="textSecondary" paragraph className={classes.text}>
                Install the browser extension for the best experience. Go to your schedule on MyU and click the "Add to
                Calendar" button. Or upload your schedule here!
              </Typography>
              <div className={classes.homeButtons}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      href="https://chrome.google.com/webstore/detail/umn-classes-to-calendar/hgdfmecgpajmoeionaieooohpbkibaen"
                      target="blank"
                      startIcon={<Icon className="fab fa-chrome" />}
                    >
                      Chrome Extension 
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      href="https://addons.mozilla.org/en-US/firefox/addon/umn-classes-to-calendar/"
                      target="blank"
                      startIcon={<Icon className="fab fa-firefox" />}
                    >
                      Firefox Extension
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      href="https://microsoftedge.microsoft.com/addons/detail/umn-classes-to-calendar/ilbnlffpbbemoigkjpnldhihppmcnhji"
                      target="blank"
                      startIcon={<Icon className="fab fa-edge" />}
                    >
                      Edge Extension
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to="/upload"
                      onClick={openInstructions}
                      startIcon={<CloudUploadOutlinedIcon />}
                    >
                      Upload class schedule
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
