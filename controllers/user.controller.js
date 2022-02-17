const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const emailService = require('../service/email.service');
const userService = require('../service/user.service');
const { userNormalizator } = require('../normalizator/user.password.normalizator');

const { WELCOME } = require('../configs/email-action.enum');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    getUsers: async ( req, res, next ) => {
        try {
            const users = await userService.getAllUsers(req.query);

            users.forEach(user => userNormalizator(user.toObject()));

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async ( req, res, next ) => {
        try {
            const { user_id } = req.params;

            let user = await User.findById(user_id)
                .lean();
            user = userNormalizator(user);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async ( req, res, next ) => {
        try {
            const password = await passwordService.hash(req.body.password);

            let newUser = await User.create({ ...req.body, password });

            newUser = userNormalizator(newUser.toObject());

            await emailService.sendMail(newUser.email, WELCOME, { user: newUser });

            res.json(newUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async ( req, res, next ) => {
        try {
            const { name } = req.body;
            const user = req.user;

            const updateUser = await User.updateOne({ _id: user._id }, { $set: { name } });
            if ( !updateUser.acknowledged ) {
                throw new ErrorHandler('Some wrong', 404);
            }

            res.json('All done!');
        } catch (e) {
            next(e);
        }
    },

};
