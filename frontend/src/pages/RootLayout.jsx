import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

function RootLayout() {
  return (
    <div className="w-full ">
      <Navbar />
      <div className="mt-20">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
