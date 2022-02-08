const User = require('../dataBase/User');

const userValidator = require('../validators/user.validator');
const { userNormalizator } = require('../normalizator/user.password.normalizator');
const ErrorHandler = require('../errors/ErrorHandler');

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

            next();
        } catch (e) {
            next(e);
        }
    },

    searchUserByEmail: ( need = true, password = false ) => async ( req, res, next ) => {
        try {
            const { email } = req.body;
            console.log('Email work');
            let userByEmail = await User.findOne({ email }).lean();

            if ( userByEmail && !need ) {
                throw new ErrorHandler('Email already exist', 404);
            }

            if ( need && !userByEmail ) {
                throw new ErrorHandler('Wrong email or password', 404);
            }

            if ( !password ) {
                userByEmail = userNormalizator(userByEmail);
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },

};
