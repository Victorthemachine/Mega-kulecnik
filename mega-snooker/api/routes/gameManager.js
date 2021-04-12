const express = require('express');
var router = express.Router();

const private = require('./../private.json');
const FileManager = require('./../utilities/fileManager');
const ConnectionWizard = require('./../engine/ConnectionWizard');

router.post('/:option', function (req, res, next) {
    let response = '';
    req.get('Token') === private.client ? response = true : response = false;
    //ANUS('=====Incoming game request=====')
    //ANUS(`Route: /gameManager/${req.params.option}\nToken: ${req.get('Token')}\nPassed: ${response}`)
    //ANUS('===============================')
    if (response) {
        FileManager.readGames().then(activeGames => {
            //ANUS(req.get('ID'));
            const wizardChild = activeGames.find(({ connectionWizard }) => {
                return connectionWizard.gameInfo.id === req.get('ID');
            });
            if (wizardChild === undefined) return res.send('Error, invalid game')
            const wizard = Object.assign(new ConnectionWizard, wizardChild.connectionWizard);
            switch (req.params.option) {
                case 'startpos':
                    res.send(wizard.calculateInitialPositions());
                    break;
                case 'updatesize':
                    res.send(wizard.initilizeSizes(req.body));
                    break;
                case 'updatestate':
                    res.send(wizard.calculatePlay(req.body));
                    break;
                case 'checkstate':
                    //TODO: make handshake type communication
                    //=> each player confirms state with API. Next check sends doUpdate
                    //=> all players accept the command, do it, then handshake again... and so on.
                    res.send({ status: 'doUpdate' });
                    break;
                default:
                    res.send('Error, invalid path');
                    break
            }
        })
    }
    !response ? res.send('Error, this page is restricted') : console.log('Why are you like this');
});

module.exports = router;