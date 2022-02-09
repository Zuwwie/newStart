const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const { userNormalizator } = require('../normalizator/user.password.normalizator');
const { emailservice } = require('../service');

module.exports = {
    getUsers: async ( req, res, next ) => {
        try {
            const users = await User.find()
                .lean();

            users.forEach(user => userNormalizator(user));

            res.json('All done, pls login.');
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

            const newUser = await User.create({ ...req.body, password });

            console.log(newUser.email);

            await emailservice.sendMail(newUser.email);

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
                throw new Error('Some wrong');
            }

            res.json('All done!');
        } catch (e) {
            next(e);
        }
    },

};
