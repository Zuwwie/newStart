module.exports = {
    MONGO_CONNECT_URL: process.env.MONGO_CONECT_URL || 'mongodb://localhost:27017/newStart',
    PORT: process.env.PORT || 5100,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'xxx',
    JWT_REFRESH_SECRET: process.env.JWT_ACCESS_SECRET || 'zzz',

};
