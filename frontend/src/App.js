import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Navbar from './components/Navbar';

import './App.css';
import Home from './components/Home';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';

const appTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#913447',
      main: '#760219',
      dark: '#520111',
      contrastText: '#fff'
    },
    secondary: {
      light: '#FFDF7E',
      main: '#FFD75E',
      dark: '#b29641',
      contrastText: '#000'
    }
  }
});

const useStyles = makeStyles(theme => ({
  background: {
    height: '100vh',
    width: '100vw',
    background: 'url("gopher.jpg") no-repeat center center fixed',
    backgroundSize: 'cover'
  }
}));

function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={appTheme}>
        <div className={classes.background}>
          <Navbar></Navbar>
          <Home></Home>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
