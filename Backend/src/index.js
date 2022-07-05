// Dependencies
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
var path = require ('path');
require("dotenv").config({ path: "../.env" });
// app.use(express.static(__dirname + '../public'));
app.use(express.static(__dirname + '/views'));
app.engine('html', require('ejs').renderFile);
app.set("view engine", "ejs");
const shop = require("./services/shop");
const transaction = require("./services/transaction");
const authentication = require("./services/authentication");

// Used for logging purposes
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:", request.path);
  console.log("Body:", request.body);
  console.log("---------------------");
  next();
};

app.use(requestLogger);

// Used to display the errors and the their message
app.use((error, request, response, next) => {
  const statusCode = error.statusCode || 500;
  console.error(error.message, error.stack);
  response.status(statusCode).json({ message: error.message });
  return;
});

// GET endpoint used to retrieve the total number of watches
app.get("/api/shop/quantity", async (request, response, next) => {
  try {
    response.json(await shop.getQuantity());
  } catch (error) {
    console.error(
      `Error while getting total number of watches `,
      error.message
    );
    next(error);
  }
});

// GET endpoint used to retrieve the list of all the watches
app.get("/api/shop", async (request, response, next) => {
  try {
    response.json(await shop.getAll(request.query.page));
  } catch (error) {
    console.error(`Error while getting watches `, error.message);
    next(error);
  }
});

// POST endpoint used to add a new watch to the shop
app.post("/api/shop", async (request, response, next) => {
  try {
    response.json(await shop.add(request.body));
  } catch (error) {
    console.error(`Error while adding watch `, error.message);
    next(error);
  }
});

// PUT endpoint used to update/alter watch's informations
app.put("/api/shop/:id", async (request, response, next) => {
  try {
    response.json(await shop.modify(request.params.id, request.body));
  } catch (error) {
    console.error(`Error while modifying watch `, error.message);
    next(error);
  }
});

// DELETE endpoint used to remove the specific watch from the store
app.delete("/api/shop/:id", async (request, response, next) => {
  try {
    response.json(await shop.remove(request.params.id));
  } catch (error) {
    console.error(`Error while removing a watch `, error.message);
    next(error);
  }
});

// GET endpoint used to retrieve the list of all transaction (client's purchases). Includes informations related to watches, client and ordered quantity
app.get("/api/transaction", async (request, response, next) => {
  try {
    response.json(await transaction.getAll(request.query.page));
  } catch (error) {
    console.error(`Error while getting transaction informations `, error.message);
    next(error);
  }
});

// POST endpoint used to store client's purchase informations. Used to store transaction history
app.post('/api/transaction', async (request, response, next) => {
  try {
    response.json(await transaction.store(request.body.transactions));
  } catch(error) {
    console.error(`Error while storing transaction informations `, error.message);
    next(error);
  }
});

// POST user credentials. Used to verify user's access rights
app.post("/api/authentication/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.send({ message: "Please enter your email & password" });
  else {
    try {
      const response = await authentication.getUser(email, password);

      if (response.message === "User has been logged in") {
        const user = JSON.parse(JSON.stringify(response));
        const token = jwt.sign(user, process.env.JWT_TOKEN, {
          expiresIn: "240m",
        });

        res.cookie("jwt", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          //maxAge: maxAge * 1000,
        });

        console.log(token);
      }
      
      res.send(response);
    } catch (err) {
      console.log(`Error while checking user credentials `, err.message);
      res.status(400).json({ err });
    }
  }
});

// POST user credentials for signing up. Used to create new users accounts
app.post('/api/authentication/signup', async (req, res, next) => {
  const {
    email,
    password: password_ok,
    last_name: last_name,
    first_name: first_name,
  } = req.body;

  if (!email || !password_ok)
    return res.send({ message: "Please enter your email & password" });
  else {
    try {
      const response = await authentication.createUser(
        email,
        password_ok,
        last_name,
        first_name
      );

      if (response.message === "Registered successfully") {
        const user = JSON.parse(JSON.stringify(response));

        const token = jwt.sign(user, process.env.JWT_TOKEN, {
          expiresIn: 6000,
        });

        res.cookie("jwt", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

        console.log(token);
      }

      res.send(response);
    } catch (err) {
      console.log(`Error while signing up user `, err.message);
      next(err);
    }
  }
});

// POST user credentials. Used in case if the user has forgotten their credentials
app.post("/api/authentication/forgotPassword", async (req, res, next) => {
  const user = req.body;

  const current_user = {
    email: user.email,
  };

  if (!user.email) 
    return res.send({ message: "Please enter your email" });
  else {
    try {
      res.json(await authentication.getPassword(user));
    } catch (err) {
      console.log(`Error while retreiving user password `, err.message);
      next(err);
    }
  }
});

// When the customer click on the link, the following redirect him to the reset password page
app.get("/api/authentication/resetPassword/:id/:token", async (req, res, next) => {
  const { id, token } = req.params;
  // typeof(id) = string => need to parse it to be able after to compare it with the user_id
  const id_int = parseInt(id);

  try {
    const customer = await authentication.getCustomer(id_int);

    const user_mail = customer.data.email;
    const user_password = customer.data.password;
    const user_id = customer.data.id;
    
    // Create a one-use link to reset the password
    const jwt_secret = process.env.JWT_TOKEN + user_password;

    // if the user_id is present :
    if (id_int !== user_id) {
      res.send("Error this id doesn't exist");
      return;
    }

    const payload = jwt.verify(token, jwt_secret);
    res.render("resetPassword", { email: user_mail });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

// Used the refresh informations when the user click on reset password button
app.post("/api/authentication/resetPassword/:id/:token", async (req, res, next) => {
  const { id, token } = req.params;
  const id_int = parseInt(id);
  
  const { password } = req.body;

  try {
    const customer = await authentication.getCustomer(id_int);

    const user_mail = customer.data.email;
    const user_password = customer.data.password;
    const user_id = customer.data.id;

    // Check the user id :
    if (id_int !== user_id) {
      res.send("Id user incorrect...");
      return;
    }

    const jwt_secret = process.env.JWT_TOKEN + user_password;
    
    const payload = jwt.verify(token, jwt_secret);
    // Crypt that password from resetPassword.ejs then update the value of the current user\
    const result = await authentication.modifyCustomerPassword(id, password);

    if (result.message === "Password has been modified") {
      const customer = await authentication.getCustomer(id);

      if (customer.message === "Customer has been found") {
        res.send(customer.data);
      }
    }
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});