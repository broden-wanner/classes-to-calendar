import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import DragAndDrop from './DragAndDrop';
import { Container, makeStyles, CircularProgress, Typography, fade } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  uploadContent: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column'
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
  },
  header: {
    color: theme.palette.grey[50],
    marginBottom: theme.spacing(2)
  },
  pageContent: {
    marginTop: '15vh'
  }
}));

function UploadPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageSrc, setSelectedImageSrc] = useState('');
  const [selectedImageLoaded, setSelectedImageLoaded] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  /**
   * Handles the selecting of an image and sets it to be previewed
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
   * Uploades the image to the api endpoint. It sends a POST request to the endpoint and handles
   * any errors returned form the server
   */
  const handleUpload = () => {
    let url = `${process.env.REACT_APP_API_ENDPOINT}/api/upload`;

    // Added the file to the form data for submission
    let formData = new FormData();
    formData.append('file', selectedImage);

    // Make the post request with the image
    setUploadStatus('uploading');
    axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        setUploadStatus('uploaded');
        const { classes, extracted_all } = res.data;
        // Assert that the returned data is an array
        if (classes && Array.isArray(classes) && classes.length > 0) {
          // Add the classes to the app
          props.handleClasses(classes);
          // Handle not all classes being extracted
          if (extracted_all) {
            props.openToast('Classes extracted', 'success');
          } else {
            props.openToast('Only some data extracted. Fill in the missing info.', 'warning');
          }
          // Redirect to the classes page
          history.push('/classes');
        } else {
          throw new Error('No classes extracted. Ensure your image meets the requirements.');
        }
      })
      .catch(error => {
        console.error('Error with image upload', error);
        let msg = '';
        if (error.response) {
          msg = error.response.data.message;
        } else {
          msg = error.message;
        }
        props.openToast(msg, 'error');
        setUploadStatus('uploaded');
      });
  };

  return (
    <div className={classes.uploadContent}>
      <Container className={classes.pageContent}>
        <Container className={classes.header}>
          <Typography variant="h2" align="center" component="h1" color="inherit">
            Upload Schedule
          </Typography>
        </Container>
        <Container maxWidth="sm" className={classes.uploadContainer}>
          <DragAndDrop
            handleImageSelect={handleImageSelect}
            handleUpload={handleUpload}
            selectedImageLoaded={selectedImageLoaded}
            selectedImageSrc={selectedImageSrc}
            openToast={props.openToast}
          ></DragAndDrop>
          {uploadStatus === 'uploading' && (
            <div className={classes.loadingOverlay}>
              <CircularProgress />
            </div>
          )}
        </Container>
      </Container>
    </div>
  );
}

UploadPage.propTypes = {
  openToast: PropTypes.func.isRequired,
  handleClasses: PropTypes.func.isRequired
};

export default UploadPage;
