const axios = require('axios');
const config = require('./apiConfig.json');
const xml2js = require('xml2js');
//const fs = require('fs');
const address = config.serverAddress + config.port;

module.exports = class apiTool {

    constructor() {
        this.axios = axios;
        const XMLParser = new DOMParser();
        this.parser = XMLParser;
        const parser = new xml2js.Parser();
        this.toJSParser = parser;
        const serializer = new XMLSerializer();
        this.serializer = serializer;
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

}