import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().required().email({ minDomainSegments: 2 }).messages({
    "any.required": "Email is required",
    "string.empty": "Email is required",
    "string.email": "Invalid email",
    "string.minDomainSegments": "Invalid email",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
    "string.empty": "Password is required",
  }),
});

const registerSchema = Joi.object({
  name: Joi.string()
    .pattern(/^(?:[a-zA-Z]{3,}\s?)+$/)
    .required()
    .messages({
      "any.required": "First and last name are required",
      "string.empty": "First and last name are required",
      "string.pattern.base":
        "The first and last name must be at least 3 characters each",
    }),
  email: Joi.string().required().email({ minDomainSegments: 2 }).messages({
    "any.required": "Email is required",
    "string.empty": "Email is required",
    "string.email": "Invalid email",
    "string.minDomainSegments": "Invalid email",
  }),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")
    )
    .required()
    .messages({
      "any.required": "Password is required",
      "string.empty": "Password is required",
      "string.pattern.base":
        "The password must be at least 8 characters long and contain at least one capital letter, one number and one special character",
    }),
});

export { loginSchema, registerSchema };
