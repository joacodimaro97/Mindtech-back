import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().required().email({ minDomainSegments: 2 }).messages({
    "any.required": "El correo electrónico es requerido",
    "string.empty": "El correo electrónico es requerido",
    "string.email": "Correo electrónico inválido",
    "string.minDomainSegments": "Correo electrónico inválido",
  }),
  password: Joi.string().required().messages({
    "any.required": "La contraseña es requerida",
    "string.empty": "La contraseña es requerida",
  }),
});

const registerSchema = Joi.object({
  name: Joi.string()
    .pattern(/^(?:[a-zA-Z]{3,}\s?)+$/)
    .required()
    .messages({
      "any.required": "El nombre y apellido son requeridos",
      "string.empty": "El nombre y apellido son requeridos",
      "string.pattern.base": "El nombre y apellido deben tener al menos 3 caracteres cada uno",
    }),
  email: Joi.string().required().email({ minDomainSegments: 2 }).messages({
    "any.required": "El correo electrónico es requerido",
    "string.empty": "El correo electrónico es requerido",
    "string.email": "Correo electrónico inválido",
    "string.minDomainSegments": "Correo electrónico inválido",
  }),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")
    )
    .required()
    .messages({
      "any.required": "La contraseña es requerida",
      "string.empty": "La contraseña es requerida",
      "string.pattern.base":
        "La contraseña debe tener al menos 8 caracteres y contener al menos una mayúscula, un número y un carácter especial.",
    }),
});


export { loginSchema, registerSchema };
