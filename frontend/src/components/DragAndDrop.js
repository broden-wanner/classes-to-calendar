import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Button, CardActions, Typography, withStyles } from '@material-ui/core';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const styles = theme => ({
  cardStyle: {
    padding: '20px'
  },
  dropzoneArea: {
    display: 'flex',
    position: 'relative',
    border: '2px dashed #ccc',
    width: '100%',
    minHeight: '400px',
    padding: '20px',
    transition: 'all 0.1s ease-in-out',
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
      cursor: 'pointer'
    }
  },
  uploadInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  filePreview: {
    fontSize: '34px',
    marginTop: theme.spacing(2)
  },
  input: {
    display: 'none'
  },
  buttonContainer: {
    justifyContent: 'center'
  }
});

export class DragAndDrop extends Component {
  state = {
    dragging: false,
    userHasSelectedFile: false
  };
  dragCounter = 0;
  dropRef = React.createRef();
  allowedFiles = ['html', 'htm'];

  isAllowedFile = file => {
    const ext = file.name.match(/\.([0-9a-z]+)/i);
    return this.allowedFiles.includes(ext[1].toLowerCase());
  };

  handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
    // Increment a drag counter to handle children dragin events
    this.dragCounter++;
    // Check to ensure there are files
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ dragging: true });
    }
  };

  handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
    // Decrement the dragcounter for child events and
    // set the the state to false if the counter is zero
    this.dragCounter--;
    if (this.dragCounter > 0) return;
    this.setState({ dragging: false });
  };

  /**
   * Handles the selection of an image by drag and drop
   */
  handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: false });
    // Check to ensure there are files being dragged
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      // Check to ensure the file is html
      if (!this.isAllowedFile(file)) {
        this.props.openToast('Invalid file type. Make sure it is html or htm.', 'error');
        return;
      }
      this.setState({ userHasSelectedFile: true });
      // Pass the image to the parent
      this.props.handleFileSelect(file);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };

  /**
   * Handles the selecting of an image using the input
   */
  handleFileSelect = e => {
    this.setState({ dragging: false });
    if (e.target.files && e.target.files.length > 0) {
      this.setState({ userHasSelectedFile: true });
      // Pass the image to the parent
      this.props.handleFileSelect(e.target.files[0]);
      this.dragCounter = 0;
    }
  };

  componentDidMount() {
    let div = this.dropRef.current;
    this.dragCounter = 0;
    div.addEventListener('dragenter', this.handleDragIn);
    div.addEventListener('dragleave', this.handleDragOut);
    div.addEventListener('dragover', this.handleDrag);
    div.addEventListener('drop', this.handleDrop);
  }

  componentWillUnmount() {
    let div = this.dropRef.current;
    div.removeEventListener('dragenter', this.handleDragIn);
    div.removeEventListener('dragleave', this.handleDragOut);
    div.removeEventListener('dragover', this.handleDrag);
    div.removeEventListener('drop', this.handleDrop);
  }

  render() {
    const { classes } = this.props;

    const upload = (
      <React.Fragment>
        <CloudUploadOutlinedIcon style={{ fontSize: 80 }} color="action"></CloudUploadOutlinedIcon>
        <Typography component="h4" variant="h4" color="textSecondary" align="center">
          Drag and drop .html or .htm file here
        </Typography>
      </React.Fragment>
    );

    const drop = (
      <React.Fragment>
        <AddPhotoAlternateIcon style={{ fontSize: 80 }} color="action"></AddPhotoAlternateIcon>
        <Typography component="h4" variant="h4" color="textSecondary">
          Add file
        </Typography>
      </React.Fragment>
    );

    const filePreview = (
      <React.Fragment>
        <FileCopyIcon style={{ fontSize: 80 }} color="action" />
        <Typography color="textSecondary" className={classes.filePreview}>
          {this.props.selectedFileName}
        </Typography>
      </React.Fragment>
    );

    return (
      <Card variante="outlined" className={classes.cardStyle}>
        <CardContent>
          <label htmlFor="html-upload">
            <div ref={this.dropRef} className={classes.dropzoneArea}>
              <div className={classes.uploadInfo}>
                {!this.state.userHasSelectedFile
                  ? !this.state.dragging
                    ? upload
                    : drop
                  : filePreview}
              </div>
            </div>
          </label>
        </CardContent>
        <CardActions className={classes.buttonContainer}>
          <input
            accept="text/html, text/htm"
            className={classes.input}
            id="html-upload"
            type="file"
            onChange={this.handleFileSelect}
          />
          <label htmlFor="html-upload">
            <Button variant="contained" color="primary" component="span">
              Browse
            </Button>
          </label>
          <Button
            variant="contained"
            color="primary"
            disabled={!this.props.selectedFileName}
            onClick={this.props.handleUpload}
          >
            Upload
          </Button>
        </CardActions>
      </Card>
    );
  }
}

DragAndDrop.propTypes = {
  handleFileSelect: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  selectedFileName: PropTypes.string.isRequired,
  openToast: PropTypes.func.isRequired
};

export default withStyles(styles)(DragAndDrop);
