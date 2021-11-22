import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";

//MATERIAL UI IMPORTS
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

const Publish = () => {
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [blogResponseStatus, setblogResponseStatus] = useState()
  const [showLoader, setshowLoader] = useState(false);
  const [showSnackBar, setshowSnackBar] = React.useState(false);
  const [filename, setfilename] = useState("");
  const [imageFile, setimageFile] = useState();

  const publishStyle = {
    padding: "5% 20%",
  };

  const InputFile = styled("input")({
    display: "none",
  });

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setshowSnackBar(false);
  };

  const handleFileChange = (e) => {
    const fileName = e.target.files[0].name;
    const file = e.target.files[0];
    setfilename(() => fileName);
    setimageFile(() => file);
  };

  const handlePublish = () => {
    setshowLoader(true);

    let blogData = new FormData();

    blogData.append("title", title);
    blogData.append("content", content);
    blogData.append("blogImage", imageFile);

    axios
      .post("http://localhost:3001/blogs", blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setshowLoader(false);
        setblogResponseStatus(() => res.status)
        setshowSnackBar(true);
        console.log(res);
      })
      .catch((err) => {
        setshowLoader(false);
        setshowSnackBar(true);
        console.log(err);
      });
  };

  return (
    <>
      <Header />

      <div style={publishStyle}>
        <h2 style={{ textAlign: "center", color: "#1975d1" }}>
          Publish Your Blog
        </h2>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            style={{ minWidth: "100%" }}
            id="outlined-basic"
            label="Blog Title"
            variant="outlined"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />

          <TextField
            style={{ minWidth: "100%" }}
            id="outlined-basic"
            label="Blog Content"
            variant="outlined"
            multiline
            rows={10}
            rowsMax={50}
            value={content}
            onChange={(e) => setcontent(e.target.value)}
          />

          <label htmlFor="contained-button-file">
            <InputFile
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) => handleFileChange(e)}
              onClick={(e) => (e.target.value = null)}
            />
            <Button variant="contained" component="span">
              Upload Thumbnail
            </Button>
            <span
              style={{ marginLeft: "10px", fontSize: "12px", color: "gray" }}
            >
              {filename}
            </span>
          </label>
        </Box>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button variant="contained" size="large" onClick={handlePublish}>
            Publish
          </Button>
        </div>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showLoader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Snackbar open={showSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
          <Alert
            onClose={handleCloseSnackBar}
            severity={blogResponseStatus === 200 ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            { blogResponseStatus === 200 ? "Blog Published Successfully !" : "Blog not published.Try again later" }
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default Publish;
