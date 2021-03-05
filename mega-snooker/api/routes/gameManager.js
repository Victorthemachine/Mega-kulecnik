const express = require('express');
var router = express.Router();

const private = require('./../private.json');
const FileManager = require('./../utilities/fileManager');
const ConnectionWizard = require('./../engine/ConnectionWizard');

router.post('/:option', function (req, res, next) {
    let response = '';
    req.get('Token') === private.client ? response = true : response = false;
    if (response) {
        FileManager.readGames().then(activeGames => {
            console.log(req.get('ID'));
            const wizardChild = activeGames.find(({ connectionWizard }) => {
                return connectionWizard.gameInfo.id === req.get('ID');
            });
            if (wizardChild === undefined) return res.send('Error, invalid game')
            const wizard = Object.assign(new ConnectionWizard, wizardChild.connectionWizard);
            console.log(wizard);
            switch (req.params.option) {
                case 'startpos':
                    res.send(wizard.calculateInitialPositions());
                    break;
                case 'updatesize':
                    res.send(wizard.initilizeSizes(req.body));
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