const mongoose = require('mongoose');
const { getConnection } = require('../dbConfig');

const requestLogsSchema = mongoose.Schema({
    "ip": String,
    "error": String,
});

module.exports = getConnection().model('request_logs', requestLogsSchema);
