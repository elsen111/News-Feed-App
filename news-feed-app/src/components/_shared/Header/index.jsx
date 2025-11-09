import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      {/* Navigation Links */}
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ margin: "0 10px" }}>
          Home
        </Link>
        <Link to="/category" style={{ margin: "0 10px" }}>
          Category
        </Link>
        <Link to="/suggested" style={{ margin: "0 10px" }}>
          Suggested
        </Link>
        <Link to="/saved" style={{ margin: "0 10px" }}>
          Saved
        </Link>
      </nav>
    </>
  );
}
