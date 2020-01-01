import React, { Component } from 'react';
import DragAndDrop from './DragAndDrop';
import { Container, Typography } from '@material-ui/core';

const styles = {
  uploadContent: {
    display: 'flex',
    alignItems: 'center',
    height: '100%'
  }
};

export class Upload extends Component {
  state = {
    files: [
      'nice.pdf',
      'verycool.jpg',
      'amazing.png',
      'goodstuff.mp3',
      'thankyou.doc'
    ]
  };

  handleDrop = files => {
    let fileList = this.state.files;
    for (var i = 0; i < files.length; i++) {
      if (!files[i].name) return;
      fileList.push(files[i].name);
    }
    this.setState({ files: fileList });
  };

  render() {
    return (
      <div style={styles.uploadContent}>
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Upload screenshot here
          </Typography>
          <DragAndDrop handleDrop={this.handleDrop}>
            <div>
              {this.state.files.map((file, i) => (
                <div key={i}>{file}</div>
              ))}
            </div>
          </DragAndDrop>
        </Container>
      </div>
    );
  }
}

export default Upload;
