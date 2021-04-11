const express = require('express');
var router = express.Router();

const private = require('./../private.json');
const ConnectionWizard = require('./../engine/ConnectionWizard');

router.post('/', function (req, res, next) {
    let response = '';
    req.get('Token') === private.client ? response = true : response = false;
    if (response) {
        console.log('Token accepted');
        const connectionWizard = new ConnectionWizard();
        const gameInfo = connectionWizard.generateGameInfo(req.get('username'));
        return res.send(gameInfo);
    } 
    console.log('Token rejected');
    res.send('Error, this page is restricted');
});

module.exports = router;