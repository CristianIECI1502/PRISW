"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const encargadoService = require("../services/encargado.service");
const { encargadoBodySchema, encargadoIdSchema } = require("../schema/encargado.schema");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos los usuarios
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getEncargado(req, res) {
  try {
    const [usuarios, errorUsuarios] = await encargadoService.getEncargados();
    if (errorUsuarios) return respondError(req, res, 404, errorUsuarios);

    usuarios.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, usuarios);
  } catch (error) {
    handleError(error, "encargado.controller -> getEncargados");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Crea un nuevo usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createEncargado(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = encargadoBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newEncargado, encargadoError] = await encargadoService.createEncargado(body);

    if (encargadoError) return respondError(req, res, 400, encargadoError);
    if (!newEncargado) {
      return respondError(req, res, 400, "No se creo el usuario");
    }

    respondSuccess(req, res, 201, newEncargado);
  } catch (error) {
    handleError(error, "encargado.controller -> createEncargado");
    respondError(req, res, 500, "No se creo el usuario");
  }
}

/**
 * Obtiene un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getEncargadoById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = encargadoIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [Encargado, errorEncargado] = await encargadoService.getEncargadoById(params.id);

    if (errorEncargado) return respondError(req, res, 404, errorEncargado);

    respondSuccess(req, res, 200, Encargado);
  } catch (error) {
    handleError(error, "encargado.controller -> getEncargadoById");
    respondError(req, res, 500, "No se pudo obtener el usuario");
  }
}

/**
 * Actualiza un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateEncargado(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = encargadoIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = encargadoBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [encargado, encargadoError] = await encargadoService.updateEncargado(params.id, body);

    if (encargadoError) return respondError(req, res, 400, encargadoError);

    respondSuccess(req, res, 200, encargado);
  } catch (error) {
    handleError(error, "encargado.controller -> updateEncargado");
    respondError(req, res, 500, "No se pudo actualizar el encargado");
  }
}

/**
 * Elimina a un encargado por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteEncargado(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = encargadoIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const encargado = await encargadoService.deleteEncargado(params.id);
    !encargado
      ? respondError(
          req,
          res,
          404,
          "No se encontro el encargado solicitado",
          "Verifique el id ingresado",
        )
      : respondSuccess(req, res, 200, encargado);
  } catch (error) {
    handleError(error, "encargado.controller -> deleteEncargado");
    respondError(req, res, 500, "No se pudo eliminar el encargado");
  }
}

module.exports = {
  getEncargado,
  createEncargado,
  getEncargadoById,
  updateEncargado,
  deleteEncargado,
};
