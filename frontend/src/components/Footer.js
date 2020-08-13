import React from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Grid,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  footer: {
    position: "absolute",
    top: "auto",
    bottom: "0",
    width: "100%",
  },
  extendedIcon: {
    marginRight: "8px",
  },
  footerLink: {
    color: theme.palette.grey[400],
    opacity: 0.5,
  },
  divder: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    color: theme.palette.grey[400],
    opacity: 0.5,
  },
}));

function Footer() {
  const classes = useStyle();

  return (
    <AppBar position="fixed" color="primary" className={classes.footer}>
      <Toolbar>
        <Grid container justify="center" alignItems="center">
          <Link to="/privacy-policy" className={classes.footerLink}>
            Privacy Policy
          </Link>
          <span className={classes.divder}>|</span>
          <Link to="/contact" className={classes.footerLink}>
            Contact
          </Link>
          <span className={classes.divder}>|</span>

          <Typography component="p" variant="p" className={classes.footerLink}>
            &#169; 2020 Broden Wanner
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
