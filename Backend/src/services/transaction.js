const db = require('./db');
const helper = require('../helper');
const config = require('../config');

// Stores transaction information into db, once the purchase has been finalized
const store = async transactions => {
    // Build the query using transaction array contents
    let query = 'INSERT INTO Transaction (CustomerId, WatchesId) VALUES';

    // For each item in cart, take into account it's quantity, so it's stored multiple times in a db (e.g. quantity 3 => 3 rows)
    transactions.forEach(transaction => {
        for (let i = 0; i < transaction.quantity; i++) {
            query += `(${transaction.CustomerId}, ${transaction.WatchesId}),`;
        }
    });

    // Get rid of the last comma and insert semicolon
    query = query.substring(0, query.length - 1) + ';';

    const result = await db.query(query);

    let message = 'An attempt to store the transaction has failed';

    if (result.affectedRows) {
        message = 'Order complete. Transaction has been paid successfully!';
    }

    return { message };
}


module.exports = {
    store
}