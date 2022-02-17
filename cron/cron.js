const cron = require('node-cron');

const removeOldTokens = require('./old-token-clean.job');

module.exports = () => {
    cron.schedule('* * 1 * * *', async ()=> {
        console.log('Cron started at', new Date().toISOString());
        await removeOldTokens();
        console.log('Cron finish at', new Date().toISOString());
    });
};

