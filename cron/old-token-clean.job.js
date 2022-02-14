const dayJS = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJS.extend(utc);

const { O_Auth } = require('../dataBase');

module.exports = async () => {
    const previosMouth = dayJS.utc()
        .subtract(1, 'month');

    const dellInfo = await O_Auth.deleteMany({
        created: { $ls: previosMouth }
    });

    console.log(dellInfo);
};
