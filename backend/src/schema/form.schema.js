"use strict";

const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de postulante.
 * @constant {Object}
 */
const formBodySchema = Joi.object({
    nombre: Joi.string().regex(/^[A-Za-z ]+$/).required().messages({
        "string.empty": "El nombre del postulante no puede estar vacio",
        "any.required": "El nombre es obligatorio",
        "string.base": "El nombre del postulante debe ser de tipo String",
        "string.pattern.base": "El nombre solo debe contener caracteres alfabéticos",
    }),
    rut: Joi.string().pattern(/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]{1}$/).required().messages({
        "string.empty": "El RUT no puede estar vacío",
        "any.required": "El RUT es obligatorio",
        "string.base": "El RUT debe ser de tipo String",
        "string.pattern.base": "El formato del RUT no es válido. Debe ser '12.345.678-9'",
    }).custom((value, helpers) => {
        const rut = value.replace(/[.\-kK]/g, "");
        const rutDigits = parseInt(rut.slice(0, -1), 10);
        const verifierDigit = rut.slice(-1).toUpperCase();

        let sum = 0;
        let multiplier = 2;

        for (let i = rutDigits.toString().length - 1; i >= 0; i--) {
            sum += rutDigits.toString().charAt(i) * multiplier;
            multiplier = multiplier % 7 === 0 ? 2 : multiplier + 1;
        }

        const calculatedVerifierDigit = 11 - (sum % 11);
        // eslint-disable-next-line max-len
        const calculatedVerifierDigitString = calculatedVerifierDigit === 10 ? "K" : calculatedVerifierDigit === 11 ? "0" : calculatedVerifierDigit.toString();

        if (calculatedVerifierDigitString !== verifierDigit) {
            return helpers.error("number.base");
        }

        return value;
    }).message("El RUT ingresado no es válido"),
    email: Joi.string().email().required().messages({
        "string.empty": "La dirección de correo electronico no puede estar vacia",
        "string.email": "Formato incorrecto, por favor ingrese un correo electronico valido",
        "any.required": "Correo electrónico es requerido",
        "strinng.base": "El correo debe ser de tipo string",
    }),
    address: Joi.string().regex(/^[A-Za-z0-9# ]+$/).required().messages({
        "string.empty": "Direccion no puede estar vacia",
        "any.required": "Direccion es requerido",
        "string.base": "Direccion debe ser de tipo String",
        "string.pattern.base": "La direccion puede contener caracteres alfabéticos, números y #",
    }),
    message: Joi.string(). required(). messages({
        "string.empty": "Mensaje no puede estar vacio",
        "any.required": "Mensaje es requerido",
        "string.base": "Mensaje debe ser de tipo String",
    }),
    phoneNumber: Joi.number().integer().max(999999999).required().messages({
        "number.base": "El número de teléfono debe ser un número",
        "number.empty": "El número de teléfono no puede estar vacío",
        "any.required": "El número de teléfono es obligatorio",
        "number.max": "El número de teléfono no puede tener más de 9 dígitos",
        "number.integer": "El número de teléfono debe ser un número entero",
    }),
    date: Joi.date(). default(Date.now),
    status: Joi.string(). default("Pending"),
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
