import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/dashboard">
        <p className="text-2xl font-bold">VISEN</p>
      </Link>
      <Link
        to="/interview-prep"
        className="font-bold hover:transform hover:translate-y-[-2px] transition-transform"
      >
        Interview Prep
      </Link>
      <Link to="/upload" className="primary-button w-fit">
        Get Insights
      </Link>
    </nav>
  );
};

export default Navbar;
