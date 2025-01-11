import React from "react";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";

function App() {
  return (
    <div className="max-w-7xl bg-gray-600 mx-auto">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
