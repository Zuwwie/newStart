const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

require('dotenv')
    .config();

const { authRouter, userRouter } = require('./routes');

const { ALLOWED_ORIGIN, MONGO_CONNECT_URL, PORT, NODE_EV } = require('./configs/config');
const ErrorHandler = require('./errors/ErrorHandler');
const checkDefaultData = require('./util/default-data.util');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);
app.use(helmet());
app.use(cors({ origin: _configureCors }));

app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));

if ( NODE_EV === 'dev' ) {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

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
    checkDefaultData();
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
