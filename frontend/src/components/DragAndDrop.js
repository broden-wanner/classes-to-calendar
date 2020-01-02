import React, { Component } from 'react';
import { Card, CardContent, Button, CardActions, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

const styles = {
  cardStyle: {
    padding: '20px'
  },
  dropzoneArea: {
    display: 'flex',
    position: 'relative',
    border: '2px dashed #ccc',
    width: '100%',
    minHeight: '300px',
    padding: '20px'
  },
  uploadInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  previewImage: {
    maxHeight: '300px'
  },
  input: {
    display: 'none'
  },
  buttonContainer: {
    justifyContent: 'center'
  }
};

export class DragAndDrop extends Component {
  state = {
    dragging: false,
    userHasSelectedImage: false
  };
  dragCounter = 0;
  dropRef = React.createRef();

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
      this.setState({ userHasSelectedImage: true });
      // Pass the image to the parent
      this.props.handleImageSelect(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };

  /**
   * Handles the selecting of an image using the input
   */
  handleImageSelect = e => {
    this.setState({ dragging: false });
    if (e.target.files && e.target.files.length > 0) {
      this.setState({ userHasSelectedImage: true });
      // Pass the image to the parent
      this.props.handleImageSelect(e.target.files[0]);
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
    const upload = (
      <React.Fragment>
        <CloudUploadOutlinedIcon style={{ fontSize: 80 }} color="action"></CloudUploadOutlinedIcon>
        <Typography component="h4" variant="h4" color="textSecondary">
          Drag and drop screenshot here
        </Typography>
      </React.Fragment>
    );

    const drop = (
      <React.Fragment>
        <AddPhotoAlternateIcon style={{ fontSize: 80 }} color="action"></AddPhotoAlternateIcon>
        <Typography component="h4" variant="h4" color="textSecondary">
          Add image
        </Typography>
      </React.Fragment>
    );

    const imagePreview = (
      <React.Fragment>
        {this.props.selectedImageLoaded ? (
          <img style={styles.previewImage} src={this.props.selectedImageSrc} alt="Uploaded" />
        ) : (
          <CircularProgress />
        )}
      </React.Fragment>
    );

    return (
      <Card variante="outlined" style={styles.cardStyle}>
        <CardContent>
          <div ref={this.dropRef} style={styles.dropzoneArea}>
            <div style={styles.uploadInfo}>
              {!this.state.userHasSelectedImage
                ? !this.state.dragging
                  ? upload
                  : drop
                : imagePreview}
            </div>
          </div>
        </CardContent>
        <CardActions style={styles.buttonContainer}>
          <input
            accept="image/*"
            style={styles.input}
            id="image-upload"
            type="file"
            onChange={this.handleImageSelect}
          />
          <label htmlFor="image-upload">
            <Button variant="contained" color="primary" component="span">
              Browse
            </Button>
          </label>
          <Button
            variant="contained"
            color="primary"
            disabled={!this.props.selectedImageSrc}
            onClick={this.props.handleUpload}
          >
            Upload
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default DragAndDrop;
