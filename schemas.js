const Joi = require('joi');

module.exports.blogSchema = Joi.object({
    blogs: Joi.object({
        title: Joi.string().required(),
        image: Joi.string().required(),
        content: Joi.string().required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
});
