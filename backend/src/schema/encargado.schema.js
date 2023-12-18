"use strict";

const Joi = require("joi");
/**
 * Esquema de validación para el cuerpo de la solicitud de encargado.
 * @constant {Object}
 */
const encargadoBodySchema = Joi.object({
    nombre: Joi.string().required().messages({
      "string.empty": "El nombre de encargado no puede estar vacío.",
      "any.required": "El nombre de encargado es obligatorio.",
      "string.base": "El nombre de encargado debe ser de tipo string.",
    }),
    apellido: Joi.string().required().messages({
        "string.empty": "El apellido no puede estar vacía.",
        "any.required": "El apellido es obligatoria.",
        "string.base": "El apellido debe ser de tipo string.",
    }),
    }).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
  });
  
  /**
   * Esquema de validación para el id de encargado.
   * @constant {Object}
   */
  const encargadoIdSchema = Joi.object({
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
  
  module.exports = { encargadoBodySchema, encargadoIdSchema };
