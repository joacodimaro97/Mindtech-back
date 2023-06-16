import Joi from "joi";

const productSchema = Joi.object({
    name: Joi.string()
    .pattern(/^(?:[a-zA-Z]{3,}\s?)+$/)
    .required()
    .messages({
        "any.required": "First and last name are required",
        "string.empty": "First and last name are required",
        "string.pattern.base": "The first and last name must have at least 3 characters each.",
    }),
    description: Joi.string()
    .empty()
    .required()
    .messages({
        "any.required": "Description is required",
        "string.empty": "Description cannot be empty",
        "string.max": "Description must be less than 100 characters",
        "string.base": "Description must be a valid text",
    }),
    images: Joi.array()
    .items(
        Joi.object({
            a: Joi.string().uri(),
            b: Joi.string().uri(),
            c: Joi.string().uri(),
        })
    )
    .min(3)
    .required()
    .messages({
        "any.required": "Images are required",
        "array.empty": "Images cannot be empty",
        "array.min": "At least 3 images are required",
    }),
    Category: Joi.string()
    .required()
    .messages({
        "any.required": "Category is required",
        "string.empty": "Category cannot be empty",
        "string.pattern.base": "Category must have at least 3 characters",
    }),
    brand: Joi.string()
    .required()
    .messages({
        "any.required": "Brand is required",
        "string.empty": "Brand cannot be empty",
        "string.pattern.base": "Brand must have at least 3 characters",
    }),
    price: Joi.number()
    .required()
    .messages({
        "any.required": "Price is required",
        "number.empty": "Price cannot be empty",
        "number.base": "Price must be a valid number",
    }),
    quantity: Joi.number()
    .required()
    .messages({
        "any.required": "Quantity is required",
        "number.empty": "Quantity cannot be empty",
        "number.base": "Quantity must be a valid number",
    }),
});

export default productSchema