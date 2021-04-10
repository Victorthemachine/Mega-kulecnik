const Vector = require('../objects/Vector');
const FileManager = require('./../utilities/fileManager');
const Hasher = require('./../utilities/hasher');
const Game = require('./Game');

const currGame = new Game();
//Good lil wizard *pat pat* UwU
module.exports = class ConnectionWizard {

    constructor(options = {}) {
        this.game = currGame;
        this.gameInfo = {
            id: "",
            pass: ""
        };
    }

    initilizeSizes(data) {
        currGame.updateSizes(this.gameInfo.id, data);
        return 'Success';
    }

    calculateInitialPositions() {
        console.log('Reached the function!');
        return currGame.computeInitialPositions(this.gameInfo.id);
    }

    calculatePlay(data) {
        console.log(`Lenght: ${Object.assign(new Game(), this.game).balls.length}`);
        return currGame.gameWizard(this.gameInfo.id, new Vector(0, 0, 100, 0));
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