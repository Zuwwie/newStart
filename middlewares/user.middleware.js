const User = require('../dataBase/User');

module.exports = {

    createUserMiddleware: async ( req, res, next ) => {
        try {
            const { email } = req.body;

            const findUser = await User.findOne({ email });

            if ( findUser ) {
                throw new Error('User is registered');
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserBodyValid: ( req, res, next ) => {
        try {
            const { name, email, password } = req.body;
            if(!name || email || password) {
                throw new Error('Some wrong');
            }


            next(e);
        } catch (e) {
            next(e);
        }
    },

};
