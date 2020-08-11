import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { format } from "date-fns";
import DragAndDrop from "../components/DragAndDrop";
import ClassDatePicker from "../components/ClassDatePicker";
import {
  Container,
  makeStyles,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  uploadContent: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
  },
  uploadContainer: {
    position: "relative",
    padding: 0,
  },
  header: {
    color: theme.palette.grey[50],
    marginBottom: theme.spacing(2),
  },
  sectionTitle: {
    marginBottom: theme.spacing(1),
  },
  pageContent: {
    marginTop: "15vh",
  },
  datePicker: {
    padding: theme.spacing(4),
  },
}));

function UploadPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [classStartDate, setClassStartDate] = useState(new Date(2020, 8, 8));
  const [classEndDate, setClassEndDate] = useState(new Date(2020, 11, 16));

  /**
   * Handles the selecting of an image and sets it to be previewed
   */
  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setSelectedFileName(file.name);
  };

  /**
   * Uploades the image to the api endpoint. It sends a POST request to the endpoint and handles
   * any errors returned form the server
   */
  const handleUpload = () => {
    let url = `${process.env.REACT_APP_API_ENDPOINT}/api/upload-html`;

    // Added the file to the form data for submission
    let formData = new FormData();
    formData.append("file", selectedFile);
    // Add the chosen dates to the form
    formData.append("startDate", format(classStartDate, "Y-M-d"));
    formData.append("endDate", format(classEndDate, "Y-M-d"));

    // Make the post request with the image
    setUploadStatus("uploading");
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUploadStatus("uploaded");
        const { classes, extracted_all } = res.data;
        // Assert that the returned data is an array
        if (classes && Array.isArray(classes) && classes.length > 0) {
          // Add the classes to the app
          props.handleClasses(classes);
          // Handle not all classes being extracted
          if (extracted_all) {
            props.openToast("Classes extracted", "success");
          } else {
            props.openToast(
              "Only some data extracted. Fill in the missing info.",
              "warning"
            );
          }
          // Redirect to the classes page
          history.push("/classes");
        } else {
          throw new Error(
            "No classes extracted. Ensure your image meets the requirements."
          );
        }
      })
      .catch((error) => {
        console.error("Error with image upload", error);
        let msg = "";
        if (error.response) {
          msg = error.response.data.message;
        } else {
          msg = error.message;
        }
        props.openToast(msg, "error");
        setUploadStatus("uploaded");
      });
  };

  return (
    <div className={classes.uploadContent}>
      <Container className={classes.pageContent}>
        <Container className={classes.header}>
          <Typography
            variant="h2"
            align="center"
            component="h1"
            color="inherit"
          >
            Upload Schedule
          </Typography>
        </Container>
        <Container maxWidth="xl" className={classes.uploadContainer}>
          <Grid container justify="space-between" spacing={4}>
            <Grid item xs={8}>
              <DragAndDrop
                handleFileSelect={handleFileSelect}
                handleUpload={handleUpload}
                uploadStatus={uploadStatus}
                selectedFileName={selectedFileName}
                openToast={props.openToast}
              ></DragAndDrop>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent className={classes.datePicker}>
                  <Typography
                    className={classes.sectionTitle}
                    component="h5"
                    variant="h5"
                  >
                    Select date range
                  </Typography>
                  <Typography variant="body2">
                    Defaults to the current UMN term: <strong>Fall 2020</strong>
                  </Typography>
                  <ClassDatePicker
                    startDate={classStartDate}
                    onStartDateChange={setClassStartDate}
                    endDate={classEndDate}
                    onEndDateChange={setClassEndDate}
                  ></ClassDatePicker>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </div>
  );
}

UploadPage.propTypes = {
  openToast: PropTypes.func.isRequired,
  handleClasses: PropTypes.func.isRequired,
};

export default UploadPage;
