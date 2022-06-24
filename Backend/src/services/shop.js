const db = require('./db');
const helper = require('../helper');
const config = require('../config');

const getQuantity = async () => {
    const rows = await db.query(
        `SELECT COUNT(*) AS quantity FROM Watches`
    );

    return rows[0];
}

const getAll = async (page = 1) => {
    const offset = helper.getOffset(page, config.listPerPage);
    
    const rows = await db.query(
        `SELECT idWatches, Name, Type, Price, Brand, Weight, MaterialType, Color, WristSize, DialWatchType, CollectionName, Mechanism, Stock, Image 
        FROM Watches LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

module.exports = {
    getQuantity,
    getAll
}