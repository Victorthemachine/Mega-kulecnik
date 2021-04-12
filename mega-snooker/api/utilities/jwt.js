const jwt = require('jsonwebtoken');
const FileManager = require('./fileManager');

module.exports = new class JWT {
    generateToken(identifier) {
        return jwt.sign(identifier, FileManager.getJWTSecret());
    }

    verifyToken(token) {
        let response = '';
        try {
            response = jwt.verify(token, FileManager.getJWTSecret(), { algorithms: 'HS256' });
        } catch (err) {
            console.log('Unauthorized');
        }
        return response;
    }
}