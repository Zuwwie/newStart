const O_Auth = require('../dataBase/O_Auth');

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

    deleteAcc: ( req, res, next ) => {
        try {

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
