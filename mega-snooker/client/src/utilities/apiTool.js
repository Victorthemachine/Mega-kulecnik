const currGame = require('./currentGame');
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
        console.log('======New instance of API======');
        console.log(currGame);
        console.log('===============================');
        this.activeGame = {
            id: currGame.id || "",
            pass: currGame.pass || "",
            username: currGame.username || "",
            serverToken: currGame.serverToken || "",
            myIndex: 0
        };
        this.whiteBall = {
            x: 0,
            y: 0
        };
        this.ws = null;
    }

    /**
     * TODO: replace this with actuall user registration
     * and use of their usernames
     * @returns 
     */
    makeUsername() {
        //https://stackoverflow.com/a/1349426
        let result = [];
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 60; i++) {
            result.push(characters.charAt(Math.floor(Math.random() * characters.length)));
        }
        return result.join('');
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
        const makeid = this.makeUsername();
        this.activeGame.username = makeid;
        currGame.username = makeid;
        return new Promise(resolve => {
            axios.post(address + config.initPath, options, {
                headers: {
                    Token: config.token,
                    username: this.activeGame.username
                }
            }).then(res => {
                console.log(res.data);
                const { token, id, pass, yourIndex } = res.data;
                this.activeGame.serverToken = token;
                this.activeGame.id = id;
                this.activeGame.pass = pass;
                this.activeGame.myIndex = yourIndex;
                currGame.serverToken = token;
                currGame.id = id;
                currGame.pass = pass;
                resolve(res.data);
                this.connectSocket();
            }).catch(error => {
                console.error(error);
            })
        });
    }

    joinGame(passphrase, options) {
        this.activeGame.pass = passphrase;
        currGame.pass = passphrase;
        const makeid = this.makeUsername();
        this.activeGame.username = makeid;
        currGame.username = makeid;
        console.log({
            Token: config.token,
            username: this.activeGame.username,
            PASS: this.activeGame.pass
        })
        return new Promise(resolve => {
            axios.post(address + config.joinPath, options, {
                headers: {
                    Token: config.token,
                    username: this.activeGame.username,
                    PASS: this.activeGame.pass
                }
            }).then(res => {
                console.log(res.data);
                const { token, id, yourIndex } = res.data;
                this.activeGame.serverToken = token;
                this.activeGame.id = id;
                this.activeGame.myIndex = yourIndex;
                currGame.serverToken = token;
                currGame.id = id;
                resolve(res.data);
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
        return new Promise(resolve => {
            const ws = new WebSocket('wss://localhost:9000');
            this.ws = ws;
            ws.onopen = function (event) {
                ws.send(`${this.activeGame.serverToken}|${this.activeGame.id}|Hello server!`);
                resolve(ws);
            }.bind(this);    
        })
    }
 /**
  *     ws.onmessage = function (event) {
        console.log(event.data);
    }
  * @param {WebSocket} socket 
  */
    
    disconnectSocket(socket, reason, code) {
        if (code === undefined) {
            if (reason === undefined || typeof reason !== String) {
                socket.close(1000, 'Successful closure');
            } else {
                socket.close(1000, reason);
            }
        } else {
            socket.close(code, reason);
        }
    }
}