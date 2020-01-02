import React, { Component } from 'react';
import DragAndDrop from './DragAndDrop';
import { Container } from '@material-ui/core';
import axios from 'axios';

const styles = {
  uploadContent: {
    display: 'flex',
    alignItems: 'center',
    height: '100%'
  }
};

export class Upload extends Component {
  state = { selectedImage: null, selectedImageSrc: '', selectedImageLoaded: false };

  /**
   * Handles the selecting of an image
   */
  handleImageSelect = image => {
    this.setState({ selectedImage: image });
    this.previewImage(image);
  };

  /**
   * Uses the image on the props to preview the image in the uploader by setting the selectedImageSrc
   */
  previewImage = image => {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      this.setState({ selectedImageSrc: reader.result, selectedImageLoaded: true });
    };
  };

  /**
   * Uploades the image to the api endpoint
   */
  handleUpload = () => {
    let url = 'YOUR URL HERE';
    let formData = new FormData();

    formData.append('file', this.state.selectedImage);

    axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {
        console.log('Image upload success');
      })
      .catch(error => {
        console.error('Error with image upload', error);
      });
  };

  render() {
    return (
      <div style={styles.uploadContent}>
        <Container maxWidth="md">
          <DragAndDrop
            handleImageSelect={this.handleImageSelect}
            handleUpload={this.handleUpload}
            selectedImageLoaded={this.state.selectedImageLoaded}
            selectedImageSrc={this.state.selectedImageSrc}
          ></DragAndDrop>
        </Container>
      </div>
    );
  }
}

export default Upload;
