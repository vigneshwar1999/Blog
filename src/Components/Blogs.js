import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//MATERIAL UI IMPORTS
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const Blogs = () => {

  const navigate = useNavigate();

  const [allBlogs, setallBlogs] = useState([]);
  const [deleteBlog, setdeleteBlog] = useState(false);

  
  useEffect(() => {
    axios.get("http://localhost:3001/blogs").then((res) => {
      console.log(res.data);
      setallBlogs(res.data);
    });
  }, [deleteBlog]);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleViewBlog = (blog, index) => {
    navigate("/viewBlog",{state: blog})
  };

  const handleShareBlog = (blog, index) => {
    console.log(index);
  };

  const handleDeleteBlog = (blog, index) => {
    axios
      .delete(`http://localhost:3001/blogs/${blog.title}`)
      .then((res) => {
        console.log(res);
        setdeleteBlog((prev) => !prev);
      })
      .catch((err) => console.log(err));
  };

  const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: "10px",
      right: "10px",
    },
  }));

  return (
    <>
      <Header />

      <div style={{ padding: "5% 10%" }}>
        {allBlogs.length < 1 && <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ color: "#bcbcbc", fontSize: "4em" }}>
            No blogs to see 🙁
          </h1>
          <Link to="/">
            <Button  variant="contained" size="large">
              Create Blogs
            </Button>
          </Link>
        </div>}
        <Grid container spacing={2}>
          {allBlogs.map((blog, index) => {

            const trimContent = blog.content.substring(0, 80);

            return (
              <Grid item xs={4} key={index}>
                <Item>
                  <Card>
                    <CardMedia
                      component="img"
                      height="270"
                      image={blog.blogImage}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {blog.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {blog.content.length > 80 ? `${trimContent}.....` : blog.content}
                      </Typography>
                    </CardContent>
                    <CardContent style={{ position: "relative" }}>
                      <StyledSpeedDial
                        ariaLabel="SpeedDial playground example"
                        hidden={false}
                        icon={<MoreVertIcon />}
                        direction="left"
                      >
                        <SpeedDialAction
                          icon={<VisibilityIcon />}
                          tooltipTitle="View Blog"
                          onClick={() => handleViewBlog(blog, index)}
                        />
                        <SpeedDialAction
                          icon={<ShareIcon />}
                          tooltipTitle="Share Blog"
                          onClick={() => handleShareBlog(blog, index)}
                        />
                        <SpeedDialAction
                          icon={<DeleteIcon />}
                          tooltipTitle="Delete Blog"
                          onClick={() => handleDeleteBlog(blog, index)}
                        />
                      </StyledSpeedDial>
                    </CardContent>
                  </Card>
                </Item>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
};

export default Blogs;
