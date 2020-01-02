import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import DragAndDrop from './DragAndDrop';
import { Container, makeStyles, CircularProgress, fade } from '@material-ui/core';

const useStyles = makeStyles(theme => {
  console.log(theme);
  return {
    uploadContent: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    uploadContainer: {
      position: 'relative',
      padding: 0
    },
    loadingOverlay: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 9999,
      width: '100%',
      height: '100%',
      borderRadius: '4px',
      backgroundColor: fade(theme.palette.grey[900], 0.4)
    }
  };
});

function Upload(props) {
  const classes = useStyles();
  const history = useHistory();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageSrc, setSelectedImageSrc] = useState('');
  const [selectedImageLoaded, setSelectedImageLoaded] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

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

    // Added the file to the form data for submission
    let formData = new FormData();
    formData.append('file', selectedImage);

    setUploadStatus('uploading');
    axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        props.openToast('Classes extracted', 'success');
        setUploadStatus('uploaded');
        props.handleClasses(res.data);
        history.push('/classes');
      })
      .catch(error => {
        console.error('Error with image upload', error);
        props.openToast(error.message, 'error');
        setUploadStatus('uploaded');
      });
  };

  return (
    <div className={classes.uploadContent}>
      <Container maxWidth="sm" className={classes.uploadContainer}>
        <DragAndDrop
          handleImageSelect={handleImageSelect}
          handleUpload={handleUpload}
          selectedImageLoaded={selectedImageLoaded}
          selectedImageSrc={selectedImageSrc}
        ></DragAndDrop>
        {uploadStatus === 'uploading' && (
          <div className={classes.loadingOverlay}>
            <CircularProgress />
          </div>
        )}
      </Container>
    </div>
  );
}

Upload.propTypes = {
  openToast: PropTypes.func.isRequired,
  handleClasses: PropTypes.func.isRequired
};

export default Upload;
