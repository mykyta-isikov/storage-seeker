const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.any(),

    id: Joi.number().positive().integer().allow(''),

    price_min: Joi.number().positive().precision(2).allow('', 0),

    price_max: Joi.number().positive().precision(2).allow(''),

    only_in_stock: Joi.string().allow('', 'on'),
});
