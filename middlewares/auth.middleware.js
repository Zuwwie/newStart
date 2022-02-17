const { compare: comparePassword } = require('../service/password.service');
const { userNormalizator, userTokenNormalizator } = require('../normalizator/user.password.normalizator');
const { AUTHORIZATION } = require('../configs/constants');
const { jwtService } = require('../service');
const { O_Auth, ActionToken } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');
const { ACCESS, REFRESH } = require('../configs/token-type.enum');
const { FORGOT_PASS } = require('../configs/action-token-tyne.enum');

module.exports = {
    isPasswordTrue: async ( req, res, next ) => {
        try {
            const user = req.user;
            const { password } = req.body;

            await comparePassword(password, user.password);

            req.user = userNormalizator(user);

            next();
        } catch (e) {
            next(e);
        }
    },

    chekToken: ( tokenType = ACCESS ) => async ( req, res, next ) => {
        try {
            const token = req.get(AUTHORIZATION);

            if ( !token ) {
                throw new ErrorHandler('Invalid token', 401);
            }

            await jwtService.verifyToken(token);

            let tokenResponse = await O_Auth.findOne({ [tokenType + '_token']: token })
                .lean()
                .populate('user_id');

            if ( !tokenResponse ) {
                throw new ErrorHandler('Invalid token', 401);
            }

            if ( tokenType === REFRESH ) {
                await O_Auth.deleteOne({ refresh_token: token });
            }

            tokenResponse = userTokenNormalizator(tokenResponse);
            req.token = tokenResponse;
            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    recordTokenPair: async ( req, res, next ) => {
        try {
            const user = req.user;

            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({
                ...tokenPair,
                user_id: user._id
            });
            req.data = {
                user,
                ...tokenPair
            };
            next();
        } catch (e) {
            next(e);
        }
    },

    chekActionToken: ( tokenType = FORGOT_PASS ) => async ( req, res, next ) => {
        try {
            const token = req.get(AUTHORIZATION);

            if ( !token ) {
                throw new ErrorHandler('Invalid token', 401);
            }

            await jwtService.verifyToken(token);

            let tokenResponse = await ActionToken.findOne({ [tokenType + '_token']: token })
                .populate('user_id');

            if ( !tokenResponse ) {
                throw new ErrorHandler('Invalid token', 401);
            }

            tokenResponse = userTokenNormalizator(tokenResponse.toObject());

            req.token = tokenResponse;
            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    },


};
