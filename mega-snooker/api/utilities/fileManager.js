const fs = require('fs');

const gameJSONPath = __dirname + './../engine/activeGames.json';
const privateJSONPath = __dirname + './../private.json';

module.exports = new class FileManager {

    createJWTSecret() {
        const crypto = require('crypto');
        let dataObj = JSON.parse(fs.readFileSync(privateJSONPath, { encoding: 'utf-8' }));
        crypto.randomBytes(64, (err, buff) => {
            if (err) console.error(err);
            dataObj.secret = buff.toString('hex');
            fs.writeFileSync(privateJSONPath, JSON.stringify(dataObj));
        });
    }

    getJWTSecret() {
        const { secret } = JSON.parse(fs.readFileSync(privateJSONPath, { encoding: 'utf-8' }));
        if (secret === undefined) secret = this.createJWTSecret();
        return secret;
    }

    /**
     * Writes another game into activeGames.json file
     * 
     * @param {JSON} data 
     */
    writeGames(data) {
        const pastData = fs.readFileSync(gameJSONPath, { encoding: 'utf-8' });
        let pastDataObj = JSON.parse(pastData);
        pastDataObj.push(data)
        fs.writeFileSync(gameJSONPath, JSON.stringify(pastDataObj));
    }

    readGames() {
        return new Promise(resolve => {
            resolve(JSON.parse(fs.readFileSync(gameJSONPath, { encoding: 'utf-8' })));
        });
    }

    updateGames(id, child, data) {
        switch (child) {
            case 'game':
                this.readGames().then(pastData => {
                    let writeThis = pastData;
                    pastData.forEach((el, index) => {
                        if (el.connectionWizard.gameInfo.id === id) {
                            writeThis[index].connectionWizard.game = data;
                        }
                    });
                    fs.writeFileSync(gameJSONPath, JSON.stringify(writeThis));
                });
                break;
            case 'balls':
                this.readGames().then(pastData => {
                    let writeThis = pastData;
                    pastData.forEach((el, index) => {
                        if (el.connectionWizard.gameInfo.id === id) {
                            writeThis[index].connectionWizard.game.balls = data;
                        }
                    });
                    fs.writeFileSync(gameJSONPath, JSON.stringify(writeThis));
                });
                break;
            case 'wizard':
                this.readGames().then(pastData => {
                    let writeThis = pastData;
                    pastData.forEach((el, index) => {
                        if (el.connectionWizard.gameInfo.id === id) {
                            writeThis[index].connectionWizard.gameInfo = data;
                        }
                    });
                    fs.writeFileSync(gameJSONPath, JSON.stringify(writeThis));
                });
                break;
            case 'status':
                this.readGames().then(pastData => {
                    let writeThis = pastData;
                    pastData.forEach((el, index) => {
                        if (el.connectionWizard.gameInfo.id === id) {
                            writeThis[index].status = data;
                        }
                    });
                    fs.writeFileSync(gameJSONPath, JSON.stringify(writeThis));
                });
                break;
            default:
                return 'Something went wrong, there is no such child!';
        }
    }

    deleteGame(id) {
        this.readGames().then(pastData => {
            let writeThis = pastData;
            pastData.forEach((el, index) => {
                if (el.connectionWizard.gameInfo.id === id) {
                    delete writeThis[index];
                }
            });
            fs.writeFileSync(gameJSONPath, JSON.stringify(writeThis));
        });
    }
}