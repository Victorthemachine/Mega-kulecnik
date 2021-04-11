const axios = require('axios');

const config = require('./apiConfig.json');
const address = config.serverAddress + config.port;

/**
 * Request handler, or in other words our API interface.
 * Write your requests, adjust them so that you get the desired effect.
 */
module.exports = class apiTool {

    constructor() {
        this.axios = axios;
        this.activeGame = {
            id: "",
            pass: "",
            username: "",
            serverToken: ""
        };
        this.ws = null;
    }

    /**
     * Fetches asset from the server.
     * 
     * @param {String} name of the directory
     * @param {String} id of the asset
     * @returns {} asset
     */
    fetchAsset(name, id) {
        console.log(`${address}/assets/${name}/${id}`);
        return new Promise(resolve => {
            axios.get(`${address}/assets/${name}/${id}`)
                .then(res => {
                    //console.log(res.data);
                    //resolve(this.parser.parseFromString(res.data, "image/svg+xml"));
                    //resolve(this.serializer.serializeToString(this.parser.parseFromString(res.data, "image/svg+xml")));
                    resolve(res.data);
                    /*                    this.toJSParser.parseString(res.data, (error, obj) => {
                                            if (error) console.error(error);
                                            console.log(obj);
                                            resolve(obj);
                                        });*/
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }

    /**
     * Pings the API to ensure it's working and stable.
     * @returns {JSON} response object
     */
    pingTest() {
        console.log('About to ping...')
        console.log(config.serverAddress + config.port + config.pingTestPath);
        return new Promise(resolve => {
            axios.get(address + config.pingTestPath)
                .then(res => {
                    console.log(`Res object:`);
                    console.log(res.data);
                    resolve(res);
                })
                .catch(error => {
                    /* FIX: implement a logger (need to do it on a server => react doesn't have node...)
                                    fs.readFile(__dirname + '/log.txt', { encoding: 'utf-8' }, (err, data) => {
                                        if (err) {
                                            console.error(err);
                                        }
                                        let write = `${data}\n\n[TIMESTAMP: ${new Date().getDate()}]\n${error}`;
                                        fs.writeFile(__dirname + '/log.txt', write);
                                    });*/
                    console.log(error);
                })
        }, 2000);
    }

    /**
     * Logs errors from React to API
     * 
     * @param {Error} error 
     * @param {import('react').ErrorInfo} errorInfo 
     */
    log(error, errorInfo) {
        axios.post(address + config.pingTestPath, {
            error: error,
            errorInfo: errorInfo
        }, {}).catch(err => {
            console.error(err);
        })
    }

    createGame(options) {
        //https://stackoverflow.com/a/1349426
        let result = [];
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 60; i++) {
            result.push(characters.charAt(Math.floor(Math.random() * characters.length)));
        }
        const makeid = result.join('');
        console.log(makeid);
        //I am not going to write this thank you very much ^
        this.activeGame.username = makeid;
        return new Promise(resolve => {
            axios.post(address + config.initPath, options, {
                headers: {
                    Token: config.token,
                    username: this.activeGame.username
                }
            }).then(res => {
                console.log(res.data);
                const { token, id, pass } = res.data;
                this.activeGame.serverToken = token;
                this.activeGame.id = id;
                this.activeGame.pass = pass;
                resolve(res.data);
                this.connectSocket();
            }).catch(error => {
                console.error(error);
            })
        });
    }

    gameIntialPlacement(options) {
        return new Promise(resolve => {
            axios.post(address + config.gameManagerPath + '/startpos', options, {
                headers: {
                    Token: config.token,
                    ID: this.activeGame.id
                }
            }).then(res => {
                console.log(res.data);
                resolve(res.data);
            }).catch(error => {
                console.error(error);
            })
        });
    }

    gameUpdatePositions(ballMap, options) {
        return new Promise(resolve => {
            axios.post(address + config.gameManagerPath + '/updatesize', ballMap, {
                headers: {
                    Token: config.token,
                    ID: this.activeGame.id
                }
            }).then(res => {
                console.log(res.data);
                resolve(res.data);
            }).catch(error => {
                console.error(error);
            })
        });
    }

    /**
     * Check whether cordinates should be updated or not.
     * Mostly in place to synchronize all users later on.
     * 
     * @param {*} GAME_ID 
     * @param {*} option 
     * @returns 
     */
    gameCheckForUpdatedPositions(option) {
        return new Promise(resolve => {
            axios.post(address + config.gameManagerPath + '/checkstate', option, {
                headers: {
                    Token: config.token,
                    ID: this.activeGame.id
                }
            }).then(res => {
                console.log(res.data);
                resolve(res.data);
            }).catch(error => {
                console.error(error);
            })
        });
    }

    gameGetNewPositions(cueCords, options) {
        return new Promise(resolve => {
            axios.post(address + config.gameManagerPath + '/updatestate', cueCords, {
                headers: {
                    Token: config.token,
                    ID: this.activeGame.id
                }
            }).then(res => {
                console.log(res.data);
                resolve(res.data);
            }).catch(error => {
                console.error(error);
            })
        });
    }

    //WebSockets ahead
    connectSocket() {
        const ws = new WebSocket('wss://localhost:9000');
        ws.onmessage = function(event) {
            console.log(event.data);
        }
        this.ws = ws;
        ws.onopen = function (event) {
            ws.send(`${this.activeGame.serverToken}|${this.activeGame.id}|Hello server!`);
        }.bind(this);
    }
}