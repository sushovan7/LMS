import React from "react";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Client/Home";
import CourseDetails from "./pages/CourseDetails";
import AllCourses from "./pages/AllCourses";
import MyCourses from "./pages/MyCourses";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="max-w-7xl px-2 mx-auto ">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<AllCourses />} />
          <Route path="profile" element={<Profile />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="course-details/:courseId" element={<CourseDetails />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
