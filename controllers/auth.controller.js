
module.exports = {
    login: ( req, res, next ) => {
        try {
            const data = req.data;

            res.json(data);
        } catch (e) {
            next(e);
        }
    },

    logout: ( req, res, next ) => {
        try {

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
