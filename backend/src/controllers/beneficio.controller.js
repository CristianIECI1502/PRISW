"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const beneficioService = require("../services/beneficio.service");
const { beneficioBodySchema, beneficioIdSchema } = require("../schema/beneficio.schema");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos los usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getBeneficio(req, res) {
  try {
    const [usuarios, errorUsuarios] = await beneficioService.getBeneficios();
    if (errorUsuarios) return respondError(req, res, 404, errorUsuarios);

    usuarios.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, usuarios);
  } catch (error) {
    handleError(error, "beneficio.controller -> getBeneficios");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Crea un nuevo usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createBeneficio(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = beneficioBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newBeneficio, beneficioError] = await beneficioService.createBeneficio(body);

    if (beneficioError) return respondError(req, res, 400, beneficioError);
    if (!newBeneficio) {
      return respondError(req, res, 400, "No se creo el beneficio");
    }

    respondSuccess(req, res, 201, newBeneficio);
  } catch (error) {
    handleError(error, "beneficio.controller -> createBeneficio");
    respondError(req, res, 500, "No se creo el beneficio");
  }
}

/**
 * Obtiene un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getBeneficioById(req, res) {
  try {
    const { params } = req;
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
 * Actualiza un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateBeneficio(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = beneficioIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = beneficioBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [beneficio, beneficioError] = await beneficioService.updateBeneficio(params.id, body);

    if (beneficioError) return respondError(req, res, 400, beneficioError);

    respondSuccess(req, res, 200, beneficio);
  } catch (error) {
    handleError(error, "beneficio.controller -> updateBeneficio");
    respondError(req, res, 500, "No se pudo actualizar el beneficio");
  }
}

/**
 * Elimina a un beneficio por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteBeneficio(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = beneficioIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const beneficio = await beneficioService.deleteBeneficio(params.id);
    !beneficio
      ? respondError(
          req,
          res,
          404,
          "No se encontro el beneficio solicitado",
          "Verifique el id ingresado",
        )
      : respondSuccess(req, res, 200, beneficio);
  } catch (error) {
    handleError(error, "beneficio.controller -> deletebeneficio");
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
