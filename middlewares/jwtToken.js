const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key';

function createToken(_id) {
    return jwt.sign({_id}, SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
}

module.exports = { createToken };