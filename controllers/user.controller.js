const User = require('../dataBase/User');
const passwordService = require('../service/password.service');

module.exports = {
    getUsers: async ( req, res ) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            // next(e);
            res.json(e);
        }
    },

    getUserById: async ( req, res ) => {
        console.log(req.params);
        const { user_id } = req.params;
        const user = await User.findById(user_id);

        res.json(user);
    },

    createUser: async ( req, res, next ) => {
        try {
            console.log(req.body);
            const password = await passwordService.hash(req.body.password);

            const newUser = await User.create({ ...req.body, password });

            res.json(newUser);
        } catch (e) {
            next(e);
        }
    },

// updateUser: async (req, res) => {
//     const updateUser = req.body;
//
//     res.json(updateUser);
// }
}
;
