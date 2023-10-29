"use strict";

const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de postulante.
 * @constant {Object}
 */
const formBodySchema = Joi.object({
    nombre: Joi.string().required().messages({
        "string.empty": "El nombre del postulante no puede estar vacio",
        "any.required": "El nombre es obligatorio",
        "string.base": "El nombre del postulante debe ser de tipo String",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "La dirección de correo electronico no puede estar vacia",
        "string.email": "Formato incorrecto, por favor ingrese un correo electronico valido",
        "any.required": "Correo electrónico es requerido",
        "strinng.base": "El correo debe ser de tipo string",
    }),
    address: Joi.string(). required(). messages({
        "string.empty": "Direccion no puede estar vacia",
        "any.required": "Direccion es requerido",
        "string.base": "Direccion debe ser de tipo String",
    }),
    message: Joi.string(). required(). messages({
        "string.empty": "Mensaje no puede estar vacio",
        "any.required": "Mensaje es requerido",
        "string.base": "Mensaje debe ser de tipo String",
    }),
    phoneNumber: Joi.number(). integer(). optional(),
    date: Joi.date(). default(Date.now),
    status: Joi.string(). default("pending"),
}).messages({
    "object.unknown": "No se reconoce algun campo",
});
/**
 * Esquema de validación para el id de formulario.
 * @constant {Object}
 */
const formIdSchema = Joi.object({
    id: Joi.string()
      .required()
      .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
      .messages({
        "string.empty": "El id no puede estar vacío.",
        "any.required": "El id es obligatorio.",
        "string.base": "El id debe ser de tipo string.",
        "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
      }),
  });
  
module.exports = { formIdSchema, formBodySchema };
