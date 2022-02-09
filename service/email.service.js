const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { NODE_MAILER_EMAIL, NODE_MAILER_PASSWORD } = require('../configs/config');
const allTemplates = require('../email-template');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-template')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NODE_MAILER_EMAIL,
        pass: NODE_MAILER_PASSWORD
    },
});

const sendMail = async ( userMail, emailAction ) => {
    const templateInfo = allTemplates[emailAction];

    const html = await templateParser.render(templateInfo.templateName);

    return transporter.sendMail({
        from: 'Nazar',
        to: userMail,
        subject: templateInfo.subject,
        html,
    });
};

module.exports = { sendMail };
