const { O_Auth, User } = require('../dataBase');

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
            console.log(req.user._id);

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
};
