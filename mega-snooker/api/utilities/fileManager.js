const fs = require('fs');

const gameJSONPath = __dirname + './../engine/activeGames.json';

module.exports = new class FileManager {

    /**
     * Writes another game into activeGames.json file
     * 
     * @param {JSON} data 
     */
    writeGames(data) {
        const pastData = fs.readFileSync(gameJSONPath, { encoding: 'utf-8' });
        let pastDataObj = JSON.parse(pastData);
        pastDataObj.push(data)
        console.log(pastDataObj);
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
                    console.log(data);
                    let writeThis = pastData;
                    pastData.forEach((el, index) => {
                        if (el.connectionWizard.gameInfo.id === id) {
                            writeThis[index].connectionWizard.game = data;
                        }
                    });
                    console.log(writeThis);
                    fs.writeFileSync(gameJSONPath, JSON.stringify(writeThis));
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
                    fs.writeFileSync(gameJSONPath, JSON.stringify(writeThis));
                });
            default:
                return 'Something went wrong, there is no such child!';
        }
    }
}