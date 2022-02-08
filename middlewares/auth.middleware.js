const { compare: comparePassword } = require('../service/password.service');
const { userNormalizator } = require('../normalizator/user.password.normalizator');

module.exports = {
    isPasswordTrue: async ( req, res, next ) => {
        try {
            let user = req.user;
            const { password } = req.body;

            console.log('Password work');

            await comparePassword(password, user.password);

            user = userNormalizator(user);

            next();
        } catch (e) {
            next(e);
        }
    },
};
