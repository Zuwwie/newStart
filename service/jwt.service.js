const jwt = require('jsonwebtoken');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign(( {}, 'xxx', { expiresIn: '15m' } ));
        const refresh_token = jwt.sign(( {}, 'zzz', { expiresIn: '2d' } ));

        return {
            access_token,
            refresh_token
        };
    },
    //
    // verifyToken: ( token, tokenType ) => {
    //     try {
    //
    //     } catch (e) {
    //         throw new ErrorHandler('Invalid token', 401);
    //     }
    // },

};
