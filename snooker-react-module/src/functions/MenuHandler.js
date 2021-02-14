const config = require('./../config.json');

// eslint-disable-next-line no-undef
module.exports = class MenuHandler {
    constructor() {
        //TODO make use of this constructor
        let token = '';
    }

    handleLogin() {
        const fetchUserToken = localStorage.getItem(config.LOCAL_STORAGE_USER_TOKEN_KEY);
        if (fetchUserToken) return this.signInUser(fetchUserToken);
        

    }

    signInUser(token) {

    }
}