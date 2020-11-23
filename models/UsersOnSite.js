const mongoose = require('mongoose');
const { getConnection } = require('../dbConfig');

const usersOnSiteSchema = mongoose.Schema({
    "ip": String,
});

module.exports = getConnection().model('users_on_site', usersOnSiteSchema);
