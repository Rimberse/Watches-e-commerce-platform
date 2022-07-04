const db = require("./db");
// const util = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const nodemailer = require("nodemailer");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");

//To create a new User with regex checking
const createUser = async (email, password_ok, last_name, first_name) => {
    const rows = await db.query(`SELECT * FROM Customer WHERE Email="${email}"`);
    console.log("email: " + email);
    console.log("lastname: " + last_name);
    console.log("firstname: " + first_name);
  
    let message;
  
    if (rows[0]) {
      message = "Email has already been registered";
  
      return {
        message,
      };
    } else {
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let regexpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

      if (email.match(regexEmail) && password_ok.match(regexpassword)) {
        const password = await bcrypt.hash(password_ok, 10);
        const result = await db.query(
          `INSERT INTO Customer SET Email="${email}", Password="${password}", LastName="${last_name}", FirstName="${first_name}"`
        );
  
        if (result.affectedRows) {
          message = "Registered successfully";
        }
      } else if (!password_ok.match(regexpassword) && !email.match(regexEmail)) {
        message =
          "Please enter a valid email \nAnd a valid password : Minimum six characters, at least one uppercase letter, one lowercase letter and one number:";
      } else if (!email.match(regexEmail)) {
        message = "Please enter a valid email";
      } else if (!password_ok.match(regexpassword)) {
        message =
          "Please enter a valid password : Minimum six characters, at least one uppercase letter, one lowercase letter and one number:";
      }

      return {
        message,
      };
    }
};

module.exports = {
    createUser
};