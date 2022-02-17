const { User } = require('../dataBase');

module.exports = {
    getAllUsers: ( query = {} ) => {
        const { perPage = 20, page = 1, sortBy = 'createdAt', order = 'asc', ...filters } = query;

        const findObj = {};

        Object.keys(filters)
            .forEach(( filterParam ) => {
                switch (filterParam) {
                    case 'name':
                        findObj.name = { $regex: `^${filters.name}`, options: 'i' };
                        break;
                }
            });

        const orderBy = order === 'asc' ? -1 : 1;

        return User
            .find(findObj)
            .sort({ [sortBy]: orderBy })
            .limit(+perPage)
            .skip(( page - 1 ) * perPage);
    }
};
