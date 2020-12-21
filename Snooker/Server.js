const express = require('express');
const https = require('https');
const configuration = require('./config.json');

//======Server constants/settings======
const app = express();
const port = configuration.port;
const hostname = configuration.host;
//=====================================

/**
 * Send first page upon landing on the site
 */
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/pages/index.html');
});

/**
 * Currently useless, however it should be implemented for user signups/logins
 */
app.post('/', function (req, res) {
});

/**
 * Initilization...
 */
app.listen(port, hostname, function () {
    console.log(`Server is http://${hostname}:${port}/`);
});
