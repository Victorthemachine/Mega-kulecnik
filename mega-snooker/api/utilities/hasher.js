const { v4: uuidv4 } = require('uuid');

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

module.exports = new class Hasher {

    /**
     * Generates a 5 character lobby passphrase
     * 
     * @returns {String} passphrase
     */
    generateLobbyPassphrase() {
        let pass = '';
        for (let i = 0; i < 5; i++) {
            let random = Math.floor(Math.random() * alphabet.length + numbers.length);
            random >= alphabet.length ? pass += numbers[random - alphabet.length] : pass += alphabet[random];
        }
        return pass;
    }

    /**
     * Generate game ID
     * 
     * @returns {String} GameID
     */
    generateGameID() {
        return uuidv4();
    }

};