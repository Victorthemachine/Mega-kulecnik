const FileManager = require('./../../utilities/fileManager');
const ConnectionWizard = require('./../../engine/ConnectionWizard');

module.exports = new class WebSocketHandler {

    processOnMessage(parsedMessage, ws) {
        console.log('PROCESSING MESSAGE');
        let token = parsedMessage[0];
        let lobby = [];
        let player = 0;
        return new Promise(resolve => {
            FileManager.readGames().then((data, error) => {
                if (error) console.error(error);
                let gameID = parsedMessage[1];
                let game = '';
                data.forEach(el => {
                    if (el.connectionWizard.gameInfo.id === gameID) {
                        game = el;
                    }
                });

                //Lobby vvv
                if (game.hasOwnProperty('connectionWizard')) {
                    if (game.connectionWizard.hasOwnProperty('gameInfo')) {
                        const { status, connectionWizard: { gameInfo } } = game;
                        console.log(gameInfo.players);
                        lobby = gameInfo.players;
                        player = lobby.findIndex(el => el === token);
                        console.log(`ClIENT (${lobby[player]}): ${parsedMessage[2]}`);
                        console.log(lobby);
                        resolve({
                            token: token,
                            lobby: lobby,
                            player: player,
                            gameID: gameID,
                            status: status
                        })
                    } else console.log('Doesn\'t have gameInfo');
                } else console.log('Doesn\'t have connectionWizard');
                resolve(false);
            })
        })
    }

    startUpGame(gameID) {
        FileManager.updateGames(gameID, 'status', 'IN PROGRESS');
        console.log('Sent messages');

    }

    getInitCordinates(gameID) {
        return new Promise(resolve => {
            FileManager.readGames().then(activeGames => {
                const wizardChild = activeGames.find(({ connectionWizard }) => {
                    return connectionWizard.gameInfo.id === gameID;
                });
                if (wizardChild === undefined) resolve(false);
                const wizard = Object.assign(new ConnectionWizard, wizardChild.connectionWizard);
                resolve(wizard.calculateInitialPositions());
            })
        })
    }

    calculatePlay(cueCords, gameID) {
        return new Promise(resolve => {
            FileManager.readGames().then(activeGames => {
                const wizardChild = activeGames.find(({ connectionWizard }) => {
                    return connectionWizard.gameInfo.id === gameID;
                });
                if (wizardChild === undefined) resolve(false);
                const wizard = Object.assign(new ConnectionWizard, wizardChild.connectionWizard);
                resolve(wizard.calculatePlay(cueCords));
            })
        })
    }

    fetchPlayerOnMove(gameID) {
        return new Promise(resolve => {
            FileManager.readGames().then(activeGames => {
                const wizardChild = activeGames.find(({ connectionWizard }) => {
                    return connectionWizard.gameInfo.id === gameID;
                });
                if (wizardChild === undefined) resolve(false);
                const { connectionWizard: { game: { player } } } = wizardChild;
                resolve(player);
            })
        })
    }

    gameFinished() {
        FileManager.deleteGame(gameID);
    }
}