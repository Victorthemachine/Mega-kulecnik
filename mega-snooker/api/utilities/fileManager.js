const fs = require('fs');

const gameJSONPath = __dirname + './../engine/activeGames.json';

module.exports = new class FileManager {

    /**
     * Writes another game into activeGames.json file
     * 
     * @param {JSON} data 
     */
    writeGames(data) {
        fs.readFile(gameJSONPath, { encoding: 'utf-8' }, (error, pastData) => {
            if (error) console.error(error);
            let pastDataObj = JSON.parse(pastData);
            pastDataObj.push(data)
            console.log(pastDataObj);
            fs.writeFile(gameJSONPath, JSON.stringify(pastDataObj), err => console.error(err));
        });
    }

    readGames() {
        return new Promise(resolve => {
            fs.readFile(gameJSONPath, { encoding: 'utf-8' }, (error, data) => {
                if (error) console.error;
                resolve(JSON.parse(data));
            })
        })
    }

    updateGames(id, child, data) {
        switch (child) {
            case 'game':
                this.readGames().then(pastData => {
                    console.log(data);
                    let writeThis = pastData;
                    pastData.forEach((el, index) => {
                        if (el.connectionWizard.gameInfo.id === id) {
                            writeThis[index].connectionWizard.game = data;
                        }
                    });
                    console.log(writeThis);
                    fs.writeFile(gameJSONPath, JSON.stringify(writeThis), err => console.error(err));
                });
                break;
            case 'balls':
                this.readGames().then(pastData => {
                    console.log(data);
                    let writeThis = pastData;
                    pastData.forEach((el, index) => {
                        if (el.connectionWizard.gameInfo.id === id) {
                            writeThis[index].connectionWizard.game.balls = data;
                        }
                    });
                    console.log(writeThis);
                    fs.writeFile(gameJSONPath, JSON.stringify(writeThis), err => console.error(err));
                });
            default:
                return 'Something went wrong, there is no such child!';
        }
    }
}