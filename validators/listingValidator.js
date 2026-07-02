const Joi = require("joi");

const listingSchema = Joi.object({
    title: Joi.string().required(),

    description: Joi.string().required(),

    category: Joi.string().required(),

    price: Joi.number().required(),

    location: Joi.string().required(),

    images: Joi.array().items(
        Joi.string().uri()
    ).optional(),

    sellerId: Joi.string().optional(),

    rating: Joi.number().optional()
});

module.exports = {
    listingSchema
};