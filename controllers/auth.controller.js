const { jwtService } = require('../service/');
const O_Auth = require('../dataBase/O_Auth');

module.exports = {
    login: async ( req, res, next ) => {
        try {
            const user = req.user;

            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({
                ...tokenPair,
                user_id: user._id
            });

            res.json({
                user,
                ...tokenPair
            });
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

    refreshtoken: async ( req, res, next ) => {
        try {
            const user = req.user;

            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({
                ...tokenPair,
                user_id: user._id
            });

            res.json({
                user,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },
};
