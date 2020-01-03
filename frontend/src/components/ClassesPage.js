import React from 'react';
import PropTypes from 'prop-types';
import UMNClass from './UMNClass';
import { makeStyles, Container, Fab } from '@material-ui/core';
import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles(theme => ({
  classesPage: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    overflow: 'auto'
  },
  classesContainer: {
    marginTop: '20vh'
  }
}));

function ClassesPage(props) {
  const classes = useStyles();
  return (
    <div className={classes.classesPage}>
      <Container maxWidth="sm" className={classes.classesContainer}>
        {props.extractedClasses.map(cls => (
          <UMNClass key={cls.id} cls={cls} handleClassChange={props.handleClassChange} />
        ))}
        <Fab variant="extended" color="primary">
          <NavigationIcon className={classes.extendedIcon} />
          Navigate
        </Fab>
      </Container>
    </div>
  );
}

ClassesPage.propTypes = {
  extractedClasses: PropTypes.array.isRequired,
  handleClassChange: PropTypes.func.isRequired
};

export default ClassesPage;
