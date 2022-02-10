const jwt = require('jsonwebtoken');

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('../configs/config');
const ErrorHandler = require('../errors/ErrorHandler');
const { ACCESS } = require('../configs/token-type.enum');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: '2d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async ( token, tokenType = ACCESS ) => {
        try {
            const secret = tokenType === 'access' ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler('Invalid token', 401);
        }
    },

    generateActionToken: () => jwt.sign({}, JWT_ACCESS_SECRET, { expiresIn: '24h' }),

};
