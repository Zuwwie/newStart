const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv')
    .config();

const { authRouter, userRouter } = require('./routes');

const { ALLOWED_ORIGIN, MONGO_CONNECT_URL, PORT, NODE_EV } = require('./configs/config');
const ErrorHandler = require('./errors/ErrorHandler');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);
app.use(cors({ origin: _configureCors }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/auth', authRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', ( err, req, res, next ) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
});

app.listen(PORT, ( () => {
    console.log(`app listen ${PORT} `);
} ));

function _configureCors( origin, callback ) {
    if ( NODE_EV === 'dev' ) {
        return callback(null, true);
    }

    const whiteList = ALLOWED_ORIGIN.split(';');

    if ( !whiteList.includes(origin) ) {
        return callback(new ErrorHandler('CORS is not allowed'), false);
    }

    return callback(null, true);
}
