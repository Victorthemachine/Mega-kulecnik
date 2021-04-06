const FileManager = require('./../utilities/fileManager');
const Hasher = require('./../utilities/hasher');
const Game = require('./Game');

module.exports = class ConnectionWizard {

    constructor(options = {}) {
        this.game = new Game();
        this.gameInfo = {
            id: "",
            pass: ""
        };
    }

    initilizeSizes(data) {
        Object.assign(new Game(), this.game).updateSizes(this.gameInfo.id, data);
        return 'Success';
    }

    calculateInitialPositions() {
        console.log('Reached the function!');        
        return Object.assign(new Game(), this.game).computeInitialPositions(this.gameInfo.id);
    }

    calculatePlay(data) {
        return Object.assign(new Game(), this.game).run(this.gameInfo.id, data);
    }

    /**
     * Generates game information.
     * 
     * @returns {JSON} gameInfo
     */
    generateGameInfo() {
        this.gameInfo.id = Hasher.generateGameID();
        this.gameInfo.pass = Hasher.generateLobbyPassphrase();
        /*console.log('================================================================')
        console.log(this);
        console.log('================================================================')*/
        let dataToWrite = {
            status: "STARTING",
            connectionWizard: {
                game: this.game,
                gameInfo: this.gameInfo
            }
        }
        FileManager.writeGames(dataToWrite);
        return this.gameInfo;
    }
};