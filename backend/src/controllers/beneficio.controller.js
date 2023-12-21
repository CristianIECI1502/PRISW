"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const beneficioService = require("../services/beneficio.service");
const { beneficioBodySchema, beneficioIdSchema } = require("../schema/beneficio.schema");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos los beneficios
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getBeneficio(req, res) {
  try {
    const [beneficios, errorBeneficios] = await beneficioService.getBeneficios();
    if (errorBeneficios) return respondError(req, res, 404, errorBeneficios);

    beneficios.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, beneficios);
  } catch (error) {
    handleError(error, "beneficio.controller -> getBeneficios");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Crea un nuevo beneficio
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createBeneficio(req, res) {
  try {
    const { body } = req;

    // Validar el cuerpo de la solicitud usando beneficioBodySchema
    const { error: bodyError } = beneficioBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newBeneficio, beneficioError] = await beneficioService.createBeneficio(body);

    if (beneficioError) return respondError(req, res, 400, beneficioError);
    if (!newBeneficio) {
      return respondError(req, res, 400, "No se creó el beneficio");
    }

    respondSuccess(req, res, 201, newBeneficio);
  } catch (error) {
    handleError(error, "beneficio.controller -> createBeneficio");
    respondError(req, res, 500, "No se creó el beneficio");
  }
}

/**
 * Obtiene un beneficio por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getBeneficioById(req, res) {
  try {
    const { params } = req;

    // Validar los parámetros usando beneficioIdSchema
    const { error: paramsError } = beneficioIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [beneficio, errorBeneficio] = await beneficioService.getBeneficioById(params.id);

    if (errorBeneficio) return respondError(req, res, 404, errorBeneficio);

    respondSuccess(req, res, 200, beneficio);
  } catch (error) {
    handleError(error, "beneficio.controller -> getBeneficioById");
    respondError(req, res, 500, "No se pudo obtener el beneficio");
  }
}

/**
 * Actualiza un beneficio por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateBeneficio(req, res) {
  try {
    const { params, body } = req;

    // Validar los parámetros y el cuerpo de la solicitud usando beneficioIdSchema y beneficioBodySchema
    const { error: paramsError } = beneficioIdSchema.validate(params);
    const { error: bodyError } = beneficioBodySchema.validate(body);

    if (paramsError) return respondError(req, res, 400, paramsError.message);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const result = await beneficioService.updateBeneficio(params.id, body);

    // Comprueba si el resultado es undefined o null
    if (!result || result.length !== 2) {
      return respondError(req, res, 500, "No se pudo actualizar el beneficio");
    }

    const [beneficio, beneficioError] = result;

    if (beneficioError) return respondError(req, res, 400, beneficioError);

    respondSuccess(req, res, 200, beneficio);
  } catch (error) {
    handleError(error, "beneficio.controller -> updateBeneficio");
    respondError(req, res, 500, "No se pudo actualizar el beneficio");
  }
}

/**
 * Elimina un beneficio por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteBeneficio(req, res) {
  try {
    const { params } = req;

    // Validar los parámetros usando beneficioIdSchema
    const { error: paramsError } = beneficioIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const beneficio = await beneficioService.deleteBeneficio(params.id);
    !beneficio
      ? respondError(
          req,
          res,
          404,
          "No se encontró el beneficio solicitado",
          "Verifique el ID ingresado",
        )
      : respondSuccess(req, res, 200, beneficio);
  } catch (error) {
    handleError(error, "beneficio.controller -> deleteBeneficio");
    respondError(req, res, 500, "No se pudo eliminar el beneficio");
  }
}

module.exports = {
  getBeneficio,
  createBeneficio,
  getBeneficioById,
  updateBeneficio,
  deleteBeneficio,
};
