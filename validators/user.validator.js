const Joi = require('joi');

const { PASSWORD_REGEXP, EMAIL_REGEXP } = require('../configs/regExp');
const userRoles = require('../configs/user-roles.enum');

const createUserValidator = Joi.object({
    name: Joi.string().alphanum()
        .min(2)
        .max(10)
        .required()
        .trim(),
    email: Joi
    .string()
    .lowercase()
    .regex(EMAIL_REGEXP)
    .required(),
    role: Joi.string().allow(...Object.values(userRoles)),
    password: Joi.string().regex(PASSWORD_REGEXP)
        .trim()
});

module.exports = {
    createUserValidator
};
