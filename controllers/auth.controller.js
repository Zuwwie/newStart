const { O_Auth, User, ActionToken } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorHandler');
const { jwtService } = require('../service');
const ActionTokenType = require('../configs/action-token-tyne.enum');
const emailService = require('../service/email.service');
const EmailActionEnum = require('../configs/email-action.enum');
const { userNormalizator } = require('../normalizator/user.password.normalizator');
const passwordService = require('../service/password.service');


module.exports = {
    login: ( req, res, next ) => {
        try {
            const data = req.data;

            res.json(data);
        } catch (e) {
            next(e);
        }
    },

    logout: async ( req, res, next ) => {
        try {
            const { access_token } = req.token;

            await O_Auth.deleteOne({ access_token });

            res.json('Logout success');
        } catch (e) {
            next(e);
        }
    },

    logoutAll: async ( req, res, next ) => {
        try {
            const { _id } = req.user;

            await O_Auth.deleteMany({ user_id: _id });

            res.json('Logout all done');
        } catch (e) {
            next(e);
        }
    },

    deleteAcc: async ( req, res, next ) => {
        try {
            const { _id } = req.user;

            await User.deleteOne({ _id });

            res.json('User delete success');
        } catch (e) {
            next(e);
        }
    },

    refreshToken: ( req, res, next ) => {
        try {
            const data = req.data;

            res.json(data);
        } catch (e) {
            next(e);
        }
    },

    sendMailForgotPassword: async ( req, res, next ) => {
        try {
            const { email } = req.body;

            let user = await User.findOne({ email })
                .lean();

            user = userNormalizator(user);

            if ( !user ) {
                throw new ErrorHandler('User not found', 404);
            }

            const actionToken = jwtService.generateActionToken(ActionTokenType.FORGOT_PASS);

            user.token = actionToken;

            await ActionToken.create({
                token: actionToken,
                token_type: ActionTokenType.FORGOT_PASS,
                user_id: user._id,
            });

            await emailService.sendMail(email, EmailActionEnum.FORGOT_PASSWORD, user);

            res.json('ok');

        } catch (e) {
            next(e);
        }
    },

    setNewPassword: async ( req, res, next ) => {
        try {
            const { _id } = req.user;
            const { newPassword } = req.body;

            const password = await passwordService.hash(newPassword);

            const updateUser = await User.updateOne({ _id }, { $set: { password } });

            if ( !updateUser.acknowledged ) {
                throw new ErrorHandler('Some wrong', 404);
            }

            await O_Auth.deleteMany({ user_id: _id });

            await ActionToken.deleteMany({ user_id: _id });

            res.json('Pass update success');
        } catch (e) {
            next(e);
        }
    },
};
