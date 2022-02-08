module.exports = {
    login: ( req, res, next ) => {
        try {
            const user = req.user;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
};
