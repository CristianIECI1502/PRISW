"use strict";

const Joi = require("joi");
/**
 * Esquema de validación para el cuerpo de la solicitud de beneficio.
 * @constant {Object}
 */
const beneficioBodySchema = Joi.object({
    beneficioname: Joi.string().required().messages({
      "string.empty": "El nombre de beneficio no puede estar vacío.",
      "any.required": "El nombre de beneficio es obligatorio.",
      "string.base": "El nombre de beneficio debe ser de tipo string.",
    }),
    descripcion: Joi.string().required().messages({
        "string.empty": "La descripcion no puede estar vacía.",
        "any.required": "La descripcion es obligatoria.",
        "string.base": "La descripcion debe ser de tipo string.",
        "string.min": "La descripcion debe tener al menos 5 caracteres.",
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
