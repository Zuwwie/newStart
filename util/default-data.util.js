const { User } = require('../dataBase');
const { ADMIN } = require('../configs/user-roles.enum');

module.exports = async () => {
    const user = await User.findOne({ role: ADMIN });

    if ( !user ) {
        await User.createUserWithHashPassword({
            name: 'Admin',
            email: 'nazar@gmail.com',
            password: 'Admin1',
            role: ADMIN
        });
    }
};
