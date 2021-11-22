import React from "react";
import Publish from "./Components/Publish";
import Blogs from "./Components/Blogs";
import ViewBlog from "./Components/ViewBlog"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Publish />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="viewBlog" element={<ViewBlog />} />
      </Routes>
      
    </>
  );
}

export default App;
