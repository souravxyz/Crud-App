import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-page-content">
        <h1 className="landing-title">Welcome to Our CRUD App</h1>
        <p className="landing-subtitle">Manage your products efficiently.</p>
        <Link to="/signup" className="landing-signup-btn">
          Sign Up Now
        </Link>
        <div className="landing-footer">
          <p>© 2024 Your Company Name</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
