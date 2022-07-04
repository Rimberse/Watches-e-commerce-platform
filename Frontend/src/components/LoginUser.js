import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import "../styles/LoginUser.css";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authenticationService from '../services/authentication';

const LoginUser = ({ setRole, setClient }) => {
  const [email_signup, setemail_signup] = useState("");
  const [password_signup, setpassword_signup] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");

  const [email_login, setemail_login] = useState("");
  const [password_login, setpassword_login] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const fromWhere = location.state?.fromWhere?.pathname || "/Shop";

  const signup = () => {
    const payload = {
      email: email_signup,
      password: password_signup,
      last_name: last_name,
      first_name: first_name,
    }
    
    authenticationService.signup(payload)
      .then((response) => {
        if (response.message) {
          alert(response.message);
        } else {
          alert("Something went wrong... Please try later.");
        }
      });
  };

  const login = () => {
    const payload = {
      email: email_login,
      password: password_login,
    }
    
    authenticationService.login(payload)
      .then((response) => {
        if (response.message) {
          alert(response.message);

          if (response.message === "User has been logged in") {
            setRole("Client");
            setClient(response.user_first_name + " " + response.user_last_name);
            setTimeout(() => navigate(fromWhere, { replace: true }), 2000);
          }
        } else {
          alert("Something went wrong... Please try later.");
        }
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <Body>
        <BigContainer>
          <br />

          <Welcome
            initial={{ y: -250 }}
            animate={{ y: -10 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
          >
            Welcome.
          </Welcome>
          <br />
          <br />
          <br />

          <br />
          <motion.a initial={{ y: -350 }} animate={{ y: -10 }}>
            Current user :
          </motion.a>
          <br />
          <InputContainer>
            <InputStyle
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255,255,255)",
                boxShadow: "0px 0px 8px rgb(255,255,255)",
              }}
              type="text"
              placeholder="email"
              onChange={(event) => {
                setemail_login(event.target.value);
              }}
            />
            <InputStyle
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255,255,255)",
                boxShadow: "0px 0px 8px rgb(255,255,255)",
              }}
              type="password"
              placeholder="password"
              onChange={(event) => {
                setpassword_login(event.target.value);
              }}
            />
          </InputContainer>
          <ButtonContainer>
            <motion.button
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255,255,255)",
                boxShadow: "0px 0px 8px rgb(255,255,255)",
              }}
              onClick={login}
              type="button"
              className="button"
            >
              Login
            </motion.button>
          </ButtonContainer>
          <br />
          <br />
          <TextStyle>
            <Link to={"/ForgotPassword"}>Forgot password ?</Link>
          </TextStyle>

          <br />
          <br />
          <motion.a initial={{ y: -350 }} animate={{ y: -10 }}>
            New users:{" "}
          </motion.a>
          <br />
          <InputContainer>
            <InputStyle
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255,255,255)",
                boxShadow: "0px 0px 8px rgb(255,255,255)",
              }}
              type="text"
              placeholder="email"
              onChange={(event) => {
                setemail_signup(event.target.value);
              }}
            />
            <InputStyle
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255,255,255)",
                boxShadow: "0px 0px 8px rgb(255,255,255)",
              }}
              type="password"
              placeholder="password"
              onChange={(event) => {
                setpassword_signup(event.target.value);
              }}
            />
            <InputStyle
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255,255,255)",
                boxShadow: "0px 0px 8px rgb(255,255,255)",
              }}
              type="firstname"
              placeholder="First Name"
              onChange={(event) => {
                setfirst_name(event.target.value);
              }}
            />
            <InputStyle
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255,255,255)",
                boxShadow: "0px 0px 8px rgb(255,255,255)",
              }}
              type="lastname"
              placeholder="Last Name"
              onChange={(event) => {
                setlast_name(event.target.value);
              }}
            />
          </InputContainer>
          <ButtonContainer>
            <motion.button
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255,255,255)",
                boxShadow: "0px 0px 8px rgb(255,255,255)",
              }}
              onClick={signup}
              type="button"
              className="button"
            >
              Signup
            </motion.button>
          </ButtonContainer>

          <br />
        </BigContainer>
      </Body>
    </motion.div>
  );
};

const InputContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-left: 5px;
  height: 20%;
  width: 100%;
  position: relative;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2 rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BigContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 500px;
  width: 500px;
  background: #f5f2f226;
  box-shadow: 0 8px 32px 0 #7788885e;
  backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  position: relative;
`;

const TextStyle = styled.h6`
  cursor: pointer;
  justify-content: center;
  position: relative;
`;

const Welcome = styled(motion.h2)`
  display: flex;
  margin: 3rem 0 2rem 0;
  position: absolute;
`;

const Separator = styled.hr`
  width: 95%;
  height: 0rem;
  border-radius: 0.8rem;
  border: none;
  margin: 1.5em 0 1rem 0;
  background-color: #ffffff;
  backdrop-filter: blur(12px);
`;

const Body = styled.div`
  font-family: "Roboto";
  background: url("https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
//   height: 100vh;
  width: 100%;
`;

const InputStyle = styled(motion.input)`
  background: #ffffff85;
  box-shadow: 0 8px 32px 0 #4577765e;
  margin-bottom: 10px;
  border-radius: 2rem;
  width: 95%;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #2a525d;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #c4c8c8;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: white;
    font-weight: 100;
    font-size: 1rem;
  }
`;

export default LoginUser;
