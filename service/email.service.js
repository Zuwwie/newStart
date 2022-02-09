const nodemailer = require('nodemailer');

const { NODE_MAILER_EMAIL, NODE_MAILER_PASSWORD } = require('../configs/config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NODE_MAILER_EMAIL,
        pass: NODE_MAILER_PASSWORD
    },
});

const sendMail = ( userMail ) => transporter.sendMail({
    from: 'Nazik',
    to: userMail,
    subject: '123',
    html: 'Hello'
});

module.exports = { sendMail };
