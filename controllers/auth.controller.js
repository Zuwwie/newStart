module.exports = {
    login: ( req, res, next ) => {
        try {
            res.json(22);
        } catch (e) {
            next(e);
        }
    },
};
