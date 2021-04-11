const Vector = require('../objects/Vector');
const FileManager = require('./../utilities/fileManager');
const Hasher = require('./../utilities/hasher');
const Game = require('./Game');
const jwt = require('./../utilities/jwt');

const currGame = new Game();
//Good lil wizard *pat pat* UwU
module.exports = class ConnectionWizard {

    constructor(options = {}) {
        this.game = currGame;
        this.gameInfo = {
            id: "",
            pass: "",
            players: [

            ]
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
        return currGame.gameWizard(this.gameInfo.id, new Vector(30, 0, 0, 0));
    }

    joinGame(username) {
        const userToken = jwt.generateToken(username);
        obj.token = userToken;
        (this.gameInfo.players).push(token);
        FileManager.updateGames(this.gameInfo.id, 'wizard', this.gameInfo);
        let obj = this.gameInfo;
        return obj;
    }

    /**
     * Generates game information.
     * 
     * @returns {JSON} gameInfo
     */
    generateGameInfo(username) {
        console.log('Generating game info');
        this.gameInfo.id = Hasher.generateGameID();
        this.gameInfo.pass = Hasher.generateLobbyPassphrase();
        const userToken = jwt.generateToken(username);
        (this.gameInfo.players).push(userToken);
        let dataToWrite = {
            status: "STARTING",
            connectionWizard: {
                game: this.game,
                gameInfo: this.gameInfo
            }
        }
        FileManager.writeGames(dataToWrite);
        let obj = this.gameInfo;
        obj.token = userToken;
        return obj;
    }
};