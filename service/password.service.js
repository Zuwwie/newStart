const bcrypyt = require('bcrypt');

module.exports = {
    hash: ( password ) => bcrypyt.hash(password, 10),

    compare: async ( password, hashPassword ) => {
        const isPasswordMatched = await bcrypyt.compare(password, hashPassword);

        if(!isPasswordMatched) {
            throw new Error('Wrong email or password');
        }
    },

};
