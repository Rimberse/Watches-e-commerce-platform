// Dependencies
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config({ path: "../.env" });
const shop = require("./services/shop");

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
    console.log(
      `Error while getting total number of properties `,
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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});