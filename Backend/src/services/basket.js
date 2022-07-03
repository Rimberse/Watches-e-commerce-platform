const db = require('./db');
const helper = require('../helper');
const config = require('../config');

const getBasket = async () => {
    const sqlRequest = await db.query(
        `SELECT * FROM Basket`
    );
    return sqlRequest;
}


module.exports = {
    getBasket
}