const db = require('./db');
const helper = require('../helper');
const config = require('../config');

const getAll = async () => {
    const sqlRequest = await db.query(
        `SELECT Customer.FirstName, Watches.Name, Watches.Image, Watches.Price FROM Customer, Transaction, Watches WHERE Customer.IdCustomer = Transaction.CustomerId AND Watches.IdWatches = Transaction.WatchesId`
    );
    return sqlRequest;
}


module.exports = {
    getAll
}