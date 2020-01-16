import React from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import { useHistory } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
  footer: {
    position: 'absolute',
    top: 'auto',
    bottom: '0',
    padding: '24px',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  extendedIcon: {
    marginRight: '8px'
  }
}));

function Footer() {
  const classes = useStyle();
  const history = useHistory();

  return (
    <div className={classes.footer}>
      <Fab variant="extended" color="primary" onClick={() => history.push('/privacy-policy')}>
        <DataUsageIcon className={classes.extendedIcon} />
        Privacy Policy
      </Fab>
    </div>
  );
}

export default Footer;
