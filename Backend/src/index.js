// Dependencies
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config({ path: "../.env" });
const shop = require("./services/shop");
const transaction = require("./services/transaction");

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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});