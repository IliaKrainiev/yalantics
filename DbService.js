const UsersOnSite = require('./models/UsersOnSite');
const RequestLogs = require('./models/RequestLogs');
const { getConnection } = require('./dbConfig');

const updateCounterWithDb = async (ip) => {
  try {
    const user = new UsersOnSite({ ip });
    await user.save({ ip })
  } catch (err) {
    await logToDb(err, ip)
  }
};

const getQuanityOfUsersOnSite = () => UsersOnSite.countDocuments();

const getQuanityOfUsersOnSiteDistinct = async (ip) => {
  try {
    const users = await UsersOnSite.distinct('ip');
    console.log('users > ', {users})
    return users.length;
  } catch (err) {
    await logToDb(err, ip);
  }
};

const getLogs = async (ip) => {
  try {
    return RequestLogs.find({});
  } catch (err) {
    await logToDb(err, ip)
  }
};

const logToDb = async (err, ip) => {
  if (!getConnection()) {
    console.log('CONNECTION LOST');
  }

  const newError = new RequestLogs({ip, error: err});
  await newError.save()
};

module.exports = {
  updateCounterWithDb,
  getQuanityOfUsersOnSite,
  logToDb,
  getQuanityOfUsersOnSiteDistinct,
  getLogs,
};
