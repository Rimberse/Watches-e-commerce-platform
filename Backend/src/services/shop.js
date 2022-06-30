const db = require('./db');
const helper = require('../helper');
const config = require('../config');

// This service is used to query/manipulate the database
// Used to know the max number of pages (for pagination)
const getQuantity = async () => {
    const rows = await db.query(
        `SELECT COUNT(*) AS quantity FROM Watches`
    );

    return rows[0];
}


const getBasket = async () => {
    const sqlRequest = await db.query(
        `SELECT * FROM Basket`
    );
    return sqlRequest;
}

const getLogs = async () => {
    const sqlRequest = await db.query(
        `SELECT Customer.FirstName, Watches.Name, Watches.Image, Watches.Price FROM Customer, Transaction, Watches WHERE Customer.IdCustomer = Transaction.CustomerId AND Watches.IdWatches = Transaction.WatchesId`
    );
    return sqlRequest;
}


// Queries db and returns all watches
const getAll = async (page = 1) => {
    const offset = helper.getOffset(page, config.listPerPage);
    
    const rows = await db.query(
        `SELECT IdWatches, Name, Type, Price, Brand, Weight, MaterialType, Color, WristSize, DialWatchType, CollectionName, Mechanism, Stock, Image, Description 
        FROM Watches LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

// Adds specific watch into the db
const add = async watch => {
    const result = await db.query(
        `INSERT INTO Watches (Name, Type, Price, Brand, Weight, MaterialType, Color, WristSize, DialWatchType, CollectionName, Mechanism, Stock, Image, Description) 
        VALUES('${watch.Name}', '${watch.Type}', '${watch.Price}', '${watch.Brand}', '${watch.Weight}', '${watch.MaterialType}', 
        '${watch.Color}', '${watch.WristSize}', '${watch.DialWatchType}', '${watch.CollectionName}', '${watch.Mechanism}', '${watch.Stock}', '${watch.Image}', '${watch.Description}');`
    );

    let message = 'An attempt to create a watch has failed';

    if (result.affectedRows) {
        message = 'Watch has been added successfully!';
    }

    return { message };
}

// Modifies a given watch, using it's id
const modify = async (IdWatches, watch) => {
    const result = await db.query(
        `UPDATE Watches SET Name="${watch.Name}", Type="${watch.Type}", Price=${watch.Price}, Brand="${watch.Brand}", Weight=${watch.Weight}, 
        MaterialType="${watch.MaterialType}", Color="${watch.Color}", WristSize=${watch.WristSize}, DialWatchType="${watch.DialWatchType}", 
        CollectionName="${watch.CollectionName}", Mechanism="${watch.Mechanism}", Stock=${watch.Stock}, Image="${watch.Image}", Description="${watch.Description}" WHERE IdWatches=${IdWatches}`
    );

    let message = 'Error while updating a watch';

    if (result.affectedRows) {
        message = 'Watch has been updated successfully';
    }

    return { message };
}

// Removes a watch from the db
const remove = async IdWatches => {
    const result = await db.query(
        `DELETE FROM Watches WHERE idWatches=${IdWatches}`
    );

    let message = 'Error while deleting a watch';

    if (result.affectedRows) {
        message = 'Watch has been removed successfully';
    }

    return { message };
}

module.exports = {
    getQuantity,
    getAll,
    add,
    modify,
    remove,
    getBasket,
    getLogs
}