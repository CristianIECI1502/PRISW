"use strict";

const Joi = require("joi");

/**
 * Expresión regular para validar que no haya símbolos.
 */
const noSymbolsRegex = /^[a-zA-Z0-9 ]*$/;

/**
 * Esquema de validación para el cuerpo de la solicitud de beneficio.
 * @constant {Object}
 */
const beneficioBodySchema = Joi.object({
    beneficioname: Joi.string()
        .required()
        .max(20)
        .pattern(noSymbolsRegex)
        .messages({
            "string.empty": "El nombre de beneficio no puede estar vacío.",
            "any.required": "El nombre de beneficio es obligatorio.",
            "string.base": "El nombre de beneficio debe ser de tipo string.",
            "string.max": "El nombre de beneficio no puede tener más de 20 caracteres.",
            "string.pattern.base": "El nombre de beneficio no puede contener símbolos.",
        }),
    descripcion: Joi.string()
        .required()
        .min(5)
        .max(30)
        .pattern(noSymbolsRegex)
        .messages({
            "string.empty": "La descripción no puede estar vacía.",
            "any.required": "La descripción es obligatoria.",
            "string.base": "La descripción debe ser de tipo string.",
            "string.min": "La descripción debe tener al menos 5 caracteres.",
            "string.max": "La descripción no puede tener más de 30 caracteres.",
            "string.pattern.base": "La descripción no puede contener símbolos.",
        }),
    empresaAsociada: Joi.string()
        .required()
        .max(20)
        .pattern(noSymbolsRegex)
        .messages({
            "string.empty": "El nombre de la empresa o tienda no puede estar vacío.",
            "any.required": "El nombre de la empresa o tienda es obligatorio.",
            "string.base": "El nombre de la empresa o tienda debe ser de tipo string.",
            "string.max": "El nombre de la empresa o tienda no puede tener más de 20 caracteres.",
            "string.pattern.base": "El nombre de la empresa o tienda no puede contener símbolos.",
        }),
    descuento: Joi.number()
        .required()
        .min(0)
        .max(100)
        .messages({
            "number.base": "El descuento debe ser de tipo numérico.",
            "any.required": "El descuento es obligatorio.",
            "number.min": "El descuento no puede ser menor que 0.",
            "number.max": "El descuento no puede ser mayor que 100.",
        }),
    fechaInicio: Joi.date()
        .required()
        .messages({
            "date.base": "La fecha de inicio debe ser de tipo fecha.",
            "any.required": "La fecha de inicio es obligatoria.",
        }),
    fechaFin: Joi.date()
        .required()
        .messages({
            "date.base": "La fecha de fin debe ser de tipo fecha.",
            "any.required": "La fecha de fin es obligatoria.",
        }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de beneficio.
 * @constant {Object}
 */
const beneficioIdSchema = Joi.object({
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

module.exports = { beneficioBodySchema, beneficioIdSchema };
