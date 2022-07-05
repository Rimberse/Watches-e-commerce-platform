const db = require("./db");
// const util = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");

// Check user account :
const getUser = async (email, password) => {
    const rows = await db.query(`SELECT * FROM Customer WHERE Email="${email}"`);
  
    let message;
  
    if (!rows.length || !(await bcrypt.compare(password, rows[0].Password))) {
      message = "Email/password incorrect";
  
      return {
        message,
      };
    } else {
      message = "User has been logged in";
      return {
        user_id: rows[0].IdCustomer,
        user_first_name: rows[0].FirstName,
        user_last_name: rows[0].LastName,
        user_mail: rows[0].Email,
        message,
      };
    }
};

// To create a new User with regex checking
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

const getPassword = async user => {
  const rows = await db.query(`SELECT * from Customer WHERE Email="${user.email}"`);

  let message;

  if (rows[0]) {
    const user_id = rows[0].IdCustomer;
    const user_mail = rows[0].Email;
    const user_password = rows[0].Password;
  
    // Create a one-use link to reset the password :
    const jwt_secret = process.env.JWT_TOKEN + user_password;
  
    const user_jwt = {
      mail: user_mail,
      id: user_id,
    };
   
    const token = jwt.sign(user_jwt, jwt_secret, { expiresIn: "15m" });
    const link = `http://localhost:5000/api/authentication/resetPassword/${user_id}/${token}`;
    console.log(link);
    message = "the link is: " + link;

    const mailOptions = {
      from: process.env.EMAIL,
      to: rows[0].Email,
      subject: "Password recovery from LUXWATCH",
      html:
        "<p><b>Your login details for RSMS</b><br><b>Email: </b>" +
        user_mail +
        "<br><b>For the password, we have the encrypted version of it which is : </b>" +
        user_password +
        "<br><b>The link to reset the password is the following : </b>" +
        link +
        "<br><br>To make sure that you are the owner of this reset request, please contact our help center (<b>715-660-8405</b>) which will ask you to confirm your request certain characters present in this password </p>" +
        "<br><b><i>All member of our Help center team is looking for your call, </i></b></p>" +
        '<br><br><a href="http://localhost:3000/">Click here to be redirected to our website</a></p>',
    };

    // Gmail account used for sending out emails in case user has forgotten their password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.MAIL_PASSWORD_NEW,
      },
    });

    const wrapedSendMail = async (mailOptions) => {
      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          message = "Your email and password have been sent successfully to your email";

          if (error) {
            console.log(error);
            resolve(false);
          } else {
            console.log("Email sent: " + info.response);
            resolve(true);
          }
        });
      });
    };

    await wrapedSendMail(mailOptions);

    return {
      message
    };
  } else {
    message = "A user with this email doesn't exist, please retry with the correct one";

    return {
      message,
    };
  }
};

const getCustomer = async id => {
  const rows = await db.query(`SELECT * FROM Customer WHERE IdCustomer = "${id}"`);
  let message = "Customer doesn't exist";

  if (rows[0]) {
    const data = {
      email: rows[0].Email,
      password: rows[0].Password,
      id: rows[0].IdCustomer
    }

    message = "Customer has been found"
    return {
      message,
      data
    }
  }

  return {
    message
  }
};

const modifyCustomerPassword = async (id, password) => {
    let password_crypted = await bcrypt.hash(password, 10);
    let message = "Failed to modify password";
    
    const result = await db.query(`UPDATE Customer SET Password="${password_crypted}" WHERE idCustomer="${id}"`);
    
    if (result.affectedRows) {
      message = "Password has been modified";
  
      return {
        message
      }
    }

    return {
      message
    }
};

module.exports = {
    getUser,
    createUser,
    getPassword,
    getCustomer,
    modifyCustomerPassword
};