import React from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import authenticationService from '../services/authentication';

const Logout = () => {
  const request = () => {
    authenticationService.logout()
        .then((response) => {
            if (response.message) {
                console.log(response.message);
                alert(response.message);
                Navigate("/LoginUser");
            } else {
                alert("Something went wrong... Please try later.");
            }
        });
  };

  return (
    <div>
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