const db = require('./db');
const helper = require('../helper');
const config = require('../config');

// Retrieves the list of transaction made by clients with ordered amount of items
const getAll = async (page = 1) => {
    const offset = helper.getOffset(page, config.listPerPage);
    
    const rows = await db.query(
        `SELECT IdWatches, Name, Type, Price, Brand, Weight, MaterialType, Color, WristSize, DialWatchType, CollectionName, Mechanism, Stock, Image, Description, 
        IdCustomer, FirstName, LastName, Email, COUNT(*) AS Quantity 
        FROM Watches, Customer, Transaction 
        WHERE
            idWatches = WatchesId
        AND 
            IdCustomer = CustomerId
        GROUP BY 
            CustomerId, WatchesId HAVING COUNT(*) > 1
        LIMIT ${offset}, ${config.listPerPage};`
    );

    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

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
    getAll,
    store
}