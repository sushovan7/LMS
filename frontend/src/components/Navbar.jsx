import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-red-300 px-2 fixed top-0 left-0 z-50 border-b py-4 shadow flex items-center justify-between">
      <Link to="/" className="font-mono tracking-wider text-xl font-bold">
        Course
      </Link>
      <div></div>
    </nav>
  );
}

export default Navbar;
