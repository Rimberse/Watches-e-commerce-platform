import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import authenticationService from "../services/authentication";

let result = "texte";
let resultat = false;

export default function Reserved() {
  const [loggedIn, setloggedIn] = useState("");

  const getAnswer = async () => {
    try {
      authenticationService.logOK()
        .then((response) => {
            console.log(response.message);
            result = response.message;
            console.log("Request : " + result);
            resultat = false;

            if (result === "yes connected") {
                setloggedIn(true);
                console.log(loggedIn);
                return loggedIn;
            } else {
                resultat = false;
                setloggedIn(false);
                console.log(loggedIn);
                return loggedIn;
            }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAnswer()
        .then(status => console.log(status));
  }, []);

  return (
    <>
      {loggedIn === true && <Outlet />}
      {loggedIn === false && <Navigate to="/LoginUser" />}
    </>
  );
}
