import React, { useState } from 'react';
import DragAndDrop from './DragAndDrop';
import { Container, makeStyles } from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  uploadContent: {
    display: 'flex',
    alignItems: 'center',
    height: '100%'
  }
}));

function Upload(props) {
  const classes = useStyles();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageSrc, setSelectedImageSrc] = useState('');
  const [selectedImageLoaded, setSelectedImageLoaded] = useState(false);

  /**
   * Handles the selecting of an image
   */
  const handleImageSelect = image => {
    setSelectedImage(image);
    previewImage(image);
  };

  /**
   * Uses the image on the props to preview the image in the uploader by setting the selectedImageSrc
   */
  const previewImage = image => {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setSelectedImageSrc(reader.result);
      setSelectedImageLoaded(true);
    };
  };

  /**
   * Uploades the image to the api endpoint
   */
  const handleUpload = () => {
    let url = 'http://localhost:5000/api/upload';
    let formData = new FormData();

    formData.append('file', selectedImage);

    axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log('Image upload success: ', response);
        props.openToast('Classes extracted', 'success');
      })
      .catch(error => {
        console.error('Error with image upload', error);
        props.openToast(error.message, 'error');
      });
  };

  return (
    <div className={classes.uploadContent}>
      <Container maxWidth="md">
        <DragAndDrop
          handleImageSelect={handleImageSelect}
          handleUpload={handleUpload}
          selectedImageLoaded={selectedImageLoaded}
          selectedImageSrc={selectedImageSrc}
        ></DragAndDrop>
      </Container>
    </div>
  );
}

Upload.propTypes = {
  openToast: PropTypes.func.isRequired
};

export default Upload;
