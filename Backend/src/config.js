// Config file used to store database credentials, configurations, etc.
const config = {
    db: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    },
    listPerPage: 10,
};

module.exports = config;