const mongoose = require('mongoose');

let connection = null;

const MONGO_URI = 'mongodb://localhost:27017/yalantics';
const MONGO_URI_TESTS = 'mongodb://localhost:27017/yalantics';

const connect = () => {
    try {
        console.log('connection --->');
        connection = mongoose.createConnection(process.env === 'TEST' ? MONGO_URI : MONGO_URI_TESTS);
        console.log('connected ---->');
        return connection;
    } catch (err) {
        console.log('ERROR: error db connection', err);
    }
};

const getConnection = () => {
    if (!connection) {
        return connect()
    }
    return connection
};

module.exports = {
    connect, getConnection, MONGO_URI
};
