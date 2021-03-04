const express = require('express');
var router = express.Router();

const private = require('./../private.json');
const ConnectionWizard = require('./../engine/ConnectionWizard');

router.post('/', function (req, res, next) {
    let response = '';
    req.get('Token') === private.client ? response = true : response = false;
    if (response) {
        const connectionWizard = new ConnectionWizard();
        return res.send(connectionWizard.generateGameInfo())
    } 
    res.send('Error, this page is restricted');
});

module.exports = router;