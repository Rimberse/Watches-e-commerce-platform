import React from "react";
import "../styles/Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing">
        <div className="background"></div>
        <div className="landing-content">
            <h1>Get a watch of your dreams.</h1>
            <p>Define your style</p>
            <div>
            <Link to="/LoginAdmin" className="btn">
                {" "} Admin access {" "}
            </Link>
            <Link to="/LoginUser" className="btn">
                {" "}Client access {" "}
            </Link>
            </div>
        </div>
    </div>
  );
};

export default Landing;