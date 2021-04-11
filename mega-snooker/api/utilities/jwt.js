const jwt = require('jsonwebtoken');
const FileManager = require('./fileManager');

module.exports = new class JWT {
    generateToken(identifier) {
        console.log('Generating token');
        return jwt.sign(identifier, FileManager.getJWTSecret());
    }

    verifyToken(token) {
        let response = '';
        try {
            response = jwt.verify(token, FileManager.getJWTSecret(), { algorithms: 'HS256' });
            console.log(response);
        } catch (err) {
            console.log('Unauthorized');
        }
        return response;
    }
}