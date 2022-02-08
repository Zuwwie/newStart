module.exports = {
    userNormalizator: ( userToNormalize ) => {
        const fieldsToRemove = ['password'];

        fieldsToRemove.forEach(field => delete userToNormalize[field]);

        return userToNormalize;
    },

    userTokenNormalizator: ( userToNormalize = {} ) => {
        const fieldsToRemove = ['password'];

        fieldsToRemove.forEach(field => delete userToNormalize.user_id[field]);

        return userToNormalize;
    },
};
