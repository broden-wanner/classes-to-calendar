import React, { Component } from 'react';
import { Card, CardContent, Button, CardActions } from '@material-ui/core';

const styles = {
  dropzoneArea: {
    position: 'relative',
    border: '2px dashed #ccc',
    width: '100%',
    padding: '20px'
  },
  overlay: {
    border: 'dashed grey 4px',
    backgroundColor: 'rgba(255,255,255,.8)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 9999
  },
  dropzone: {
    width: '100%'
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
    dragging: false
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

  handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: false });
    // Check to ensure there are files being dragged
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
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
    return (
      <Card variante="outlined">
        <CardContent>
          <div ref={this.dropRef} style={styles.dropzoneArea}>
            {this.state.dragging && (
              <div style={styles.overlay}>
                <div style={styles.dropzone}>
                  <div>drop here :)</div>
                </div>
              </div>
            )}
            {this.props.children}
          </div>
        </CardContent>
        <CardActions style={styles.buttonContainer}>
          <input
            accept="image/*"
            style={styles.input}
            id="image-upload"
            type="file"
          />
          <label htmlFor="image-upload">
            <Button variant="contained" color="primary" component="span">
              Browse
            </Button>
          </label>
          <Button variant="contained" color="primary">
            Upload
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default DragAndDrop;
