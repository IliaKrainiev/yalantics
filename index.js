const app = require('express')();
app.listen(3000);

const { updateCounterWithDb, getQuanityOfUsersOnSite, getQuanityOfUsersOnSiteDistinct, getLogs } = require('./DbService');
const { connect } = require('./dbConfig');

connect();

app.get('/', async (req, res) => {
    await updateCounterWithDb(req.connection.remoteAddress);
    const result = await getQuanityOfUsersOnSite(req.connection.remoteAddress);
    console.log({ result });
    res.end(JSON.stringify({ amountOfUsersOnSite: result }))
});

app.get('/logs', async (req, res) => {
    const logs = await getLogs(req.connection.remoteAddress);
    res.end(JSON.stringify({ logs }));
});

app.get('/distinct-by-ip', async (req, res) => {
    await updateCounterWithDb(req.connection.remoteAddress);
    const result = await getQuanityOfUsersOnSiteDistinct(req.connection.remoteAddress);
    res.end(JSON.stringify({ amountOfUsersOnSiteDistinct: result }));
});

module.exports = app;
