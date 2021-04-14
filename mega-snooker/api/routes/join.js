const express = require('express');
var router = express.Router();

const private = require('./../private.json');
const FileManager = require('./../utilities/fileManager');
const ConnectionWizard = require('./../engine/ConnectionWizard');

router.post('/', function (req, res, next) {
    let response = '';
    req.get('Token') === private.client ? response = true : response = false;
    if (response) {
        FileManager.readGames().then(activeGames => {
            const wizardChild = activeGames.find(({ connectionWizard }) => {
                return connectionWizard.gameInfo.pass === req.get('PASS');
            });
            if (wizardChild === undefined) {
                return res.send('Error, invalid game');
            } else {
                const wizard = Object.assign(new ConnectionWizard, wizardChild.connectionWizard);
                return res.send(wizard.joinGame(req.get('username')));
            }
        })
    } else {
        res.send('Error, this page is restricted');
    }
});

module.exports = router;