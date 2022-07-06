import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authenticationService from '../services/authentication';
import '../styles/Logout.css';

const Logout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromWhere = location.state?.fromWhere?.pathname || "/LoginUser";

  const request = () => {
    authenticationService.logout()
        .then((response) => {
            if (response.message) {
                console.log(response.message);
                alert(response.message);
                setTimeout(() => navigate(fromWhere, { replace: true }), 2000);
            } else {
                alert("Something went wrong... Please try later.");
            }
        });
  };

  return (
    <div className="Logout">
      <button onClick={request} type="button" className="button">
        Logout
      </button>
      <button type="button" className="button">
        <Link to={"/ModifyUser"}>Modify user</Link>
      </button>
    </div>
  );
};

export default Logout;