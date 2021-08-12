const Joi = require('joi');

module.exports = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': `Ел. пошта хибного формату`,
        'string.empty': `Необхідна ел. пошта`,
        'string.email': `Ел. пошта хибного формату`,
        'any.required': `Необхідна ел. пошта`,
    }),

    last_name: Joi.string().normalize().min(2).max(40).required().messages({
        'string.base': `Хибний формат прізвища`,
        'string.empty': `Необхідне прізвище`,
        'string.normalize': `Хибний формат прізвища`,
        'string.max': `Прізвище повинно мати довжину не більше {#limit}`,
        'string.min': `Прізвище повинно мати довжину не менше {#limit}`,
        'any.required': `Необхідне прізвище`,
    }),

    first_name: Joi.string().normalize().min(2).max(40).required().messages({
        'string.base': `Хибний формат імені`,
        'string.empty': `Необхідне ім\'я`,
        'string.normalize': `Хибний формат імені`,
        'string.max': `Ім\'я повинно мати довжину не більше {#limit}`,
        'string.min': `Ім\'я повинно мати довжину не менше {#limit}`,
        'any.required': `Необхідне ім\'я`,
    }),

    password: Joi.string().min(6).max(50).required().messages({
        'string.base': `Пароль хибного формату`,
        'string.empty': `Необхідний пароль`,
        'any.pattern': `Хибний формат пароля`,
        'string.max': `Пароль повинен мати довжину не більше {#limit}`,
        'string.min': `Пароль повинен мати довжину не менше {#limit}`,
        'any.required': `Необхідний пароль`,
    }),

    repeat_password: Joi.ref('password'),
});
