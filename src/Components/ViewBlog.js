import { useLocation } from "react-router-dom";

//MATERIAL UI
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

// COMPONENTS
import Header from "./Header";

const ViewBlog = () => {
  const location = useLocation();

  const blogTitle = location.state.title;
  const blogContent = location.state.content;
  const blogImgUrl = location.state.blogImage;

  console.log("LOCATION DATA", location);
  return (
    <>
      <Header />

      <CssBaseline />
      <Container fixed>
        <img style={{width: "100%",height: "500px"}} src={blogImgUrl} />
        <Box sx={{ bgcolor: "#e8f2fd", m: 4 }}>
          <div style={{padding: "5%"}}>
            <p>{blogContent}</p>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default ViewBlog;
