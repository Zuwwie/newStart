const { compare: comparePassword } = require('../service/password.service');
const { userNormalizator, userTokenNormalizator } = require('../normalizator/user.password.normalizator');
const { AUTHORIZATION } = require('../configs/constants');
const { jwtService } = require('../service');
const O_Auth = require('../dataBase/O_Auth');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    isPasswordTrue: async ( req, res, next ) => {
        try {
            const user = req.user;
            const { password } = req.body;

            console.log('Password work');

            await comparePassword(password, user.password);

            req.user = userNormalizator(user);

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async ( req, res, next ) => {
        try {
            const token = req.get(AUTHORIZATION);

            if ( !token ) {
                throw new ErrorHandler('Invalid token', 401);
            }

            await jwtService.verifyToken(token);

            let tokenResponse = await O_Auth.findOne({ access_token: token })
                .lean()
                .populate('user_id');

            if ( !tokenResponse ) {
                throw new ErrorHandler('Invalid token', 401);
            }

            tokenResponse = userTokenNormalizator(tokenResponse);

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    chekRefreshToken: async ( req, res, next ) => {
        try {
            const token = req.get(AUTHORIZATION);

            if ( !token ) {
                throw new ErrorHandler('Invalid token', 401);
            }

            await jwtService.verifyToken(token);

            let tokenResponse = await O_Auth.findOne({ refresh_token: token })
                .lean()
                .populate('user_id');

            if ( !tokenResponse ) {
                throw new ErrorHandler('Invalid token', 401);
            }

            await O_Auth.deleteOne({ refresh_token: token });

            tokenResponse = userTokenNormalizator(tokenResponse);

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

};
