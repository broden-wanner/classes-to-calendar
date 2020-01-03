import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  info: {
    flexDirection: 'column'
  }
}));

function UMNClass(props) {
  const classes = useStyles();
  const { cls, handleClassChange } = props;
  const [title, setTitle] = useState(cls.name);

  /**
   * Converts a string in snake case to title case. Used for converting the props on
   * the class to labels.
   */
  const snakeToTitleCase = str => {
    str = str.replace(/_/g, ' ');
    str = str.replace(/\w\S*/g, txt => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    return str;
  };

  /**
   * Handles input changes on the class by taking the name on the input and using
   * it as a prop on the class to change it to the input value. Must manually set the name
   * to the title because it only updates with the state.
   */
  const handleChanges = e => {
    cls[e.target.name] = e.target.value;
    handleClassChange(cls);
    // Set the title to the name if changed
    if (e.target.name === 'name') {
      setTitle(cls.name);
    }
  };

  return (
    <ExpansionPanel key={cls.id}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
        <Typography className={classes.heading}>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.info}>
        {Object.keys(cls).map(
          (name, i) =>
            name !== 'id' && (
              <FormControl key={i}>
                <InputLabel>{snakeToTitleCase(name)}</InputLabel>
                <Input name={name} defaultValue={cls[name]} onChange={handleChanges} />
              </FormControl>
            )
        )}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

UMNClass.propTypes = {
  cls: PropTypes.object.isRequired,
  handleClassChange: PropTypes.func.isRequired
};

export default UMNClass;
