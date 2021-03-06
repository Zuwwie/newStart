module.exports = {
    NODE_EV: process.env.NODE_EV || 'dev',

    MONGO_CONNECT_URL: process.env.MONGO_CONECT_URL || 'mongodb://localhost:27017/newStart',
    PORT: process.env.PORT || 5100,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'xxx',
    JWT_REFRESH_SECRET: process.env.JWT_ACCESS_SECRET || 'zzz',
    JWT_ACTION_SECRET: process.env.JWT_ACTION_SECRET || 'ooo',

    NODE_MAILER_EMAIL: process.env.NODE_MAILER_EMAIL || 'mail@gmail.com',
    NODE_MAILER_PASSWORD: process.env.NODE_MAILER_PASSWORD || 'password',

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000'

};
