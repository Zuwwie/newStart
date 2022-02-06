module.exports = {
    getUsers: ( req, res ) => {
        res.json('Gett all');
    },

    getUserById: ( req, res ) => {
        console.log(req.params);
        res.json('yes');
    },

    createUser: ( req, res ) => {
        console.log(req.body);
        res.json('Create user');
    }
};
