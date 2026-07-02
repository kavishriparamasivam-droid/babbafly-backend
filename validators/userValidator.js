const Joi = require("joi");

const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),

    email: Joi.string()
        .email()
        .required(),

    phone: Joi.string()
        .min(10)
        .max(15)
        .required(),

    password: Joi.string()
        .min(6)
        .required()
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required()
});

module.exports = {
    registerSchema,
    loginSchema
};