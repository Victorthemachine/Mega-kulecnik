const express = require('express');
const https = require('https');
const configuration = require('./../config.json');
const Game = require('./Game.js');
const Vector = require('./objects/Vector.js');

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
 * Currently for testing(use it like this: console.log(function())), however it should be implemented for user signups/logins
 */
app.post('/game.html', function (req, res) {
    const currGame = new Game();
    let tempArr = currGame.getBalls();
    console.log(tempArr);
    //console.log(tempArr[1]);
    //console.log(`BtB collision: ${currGame.checkCollisionBtB(tempArr[0], tempArr[1])}\nBtT collision: ${currGame.checkCollisionBtT(tempArr[0])}`);
    console.log('============================================================================');
    console.log(tempArr[0].collisionCheck());
    console.log('============================================================================');

    const vector = new Vector(0, 0, 5, 7, 15, {
        owner: undefined
    });
    console.log(tempArr[2]);
    tempArr[2].moveByVector(vector);
    console.log(tempArr[2]);
    tempArr[1].vector.setVector(195, tempArr[1].vector.force);
    console.log(tempArr[1].vector);
    currGame.computeBtTCollision(tempArr[1]);
    console.log(tempArr[1]);
    res.sendFile(__dirname + "/pages/game.html");
});

/**
 * Initilization...
 */
app.listen(port, hostname, function () {
    console.log(`Server is http://${hostname}:${port}/`);
});
