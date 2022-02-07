const User = require('../dataBase/User');

const userValidator = require('../validators/user.validator');

module.exports = {

    createUserMiddleware: async ( req, res, next ) => {
        try {
            const { email } = req.body;

            const findUser = await User.findOne({ email });

            if ( findUser ) {
                throw new Error('User is registered');
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserBodyValid: async ( req, res, next ) => {
        try {
            const { error, value } = await userValidator.createUserValidator.validate(req.body);
            if ( error ) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next(e);
        } catch (e) {
            next(e);
        }
    },

};
