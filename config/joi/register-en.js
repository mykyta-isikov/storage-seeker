const Joi = require('joi');

module.exports = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': `Must be a valid email adress`,
        'string.empty': `Email required`,
        'string.email': `Must be a valid email adress`,
        'any.required': `Email required`,
    }),

    last_name: Joi.string().normalize().min(2).max(40).required().messages({
        'string.base': `Must be a valid last name`,
        'string.empty': `Last name required`,
        'string.normalize': `Must be a valid last name`,
        'string.max': `Last name should be {#limit} characters max`,
        'string.min': `Last name should be at least {#limit} characters long`,
        'any.required': `Last name required`,
    }),

    first_name: Joi.string().normalize().min(2).max(40).required().messages({
        'string.base': `Must be a valid first name`,
        'string.empty': `First name required`,
        'string.normalize': `Must be a valid first name`,
        'string.max': `First name should be {#limit} characters max`,
        'string.min': `First name should be at least {#limit} characters long`,
        'any.required': `First name required`,
    }),

    password: Joi.string().min(6).max(30).required().messages({
        'string.base': `Must be a valid password`,
        'string.empty': `Password required`,
        'any.pattern': `Must be a valid password`,
        'string.max': `Password should be {#limit} characters max`,
        'string.min': `Password should be at least {#limit} characters long`,
        'any.required': `Password required`,
    }),

    repeat_password: Joi.ref('password'),
});
