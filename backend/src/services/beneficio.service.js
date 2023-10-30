"use strict";
// Importa el modelo de datos 'beneficio'
const Beneficio = require("../models/beneficio.model.js");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos los beneficio de la base de datos
 * @returns {Promise} Promesa con el objeto de los beneficio
 */
async function getBeneficios() {
  try {
    const beneficios = await Beneficio.find();
    if (!beneficios) return [null, "No hay beneficio"];

    return [beneficios, null];
  } catch (error) {
    handleError(error, "beneficio.service -> getBeneficios");
  }
}

/**
 * Crea un nuevo beneficio en la base de datos
 * @param {Object} beneficio Objeto de beneficio
 * @returns {Promise} Promesa con el objeto de beneficio creado
 */
async function createBeneficio(beneficio) {
  try {
    const { beneficioname, descripcion } = beneficio;

    const beneficioFound = await Beneficio.findOne({ beneficioname: beneficio.beneficioname });
    if (beneficioFound) return [null, "El beneficio ya existe"];

    const newBeneficio = new Beneficio({
      beneficioname,
      descripcion,
    });
    await newBeneficio.save();

    return [newBeneficio, null];
  } catch (error) {
    handleError(error, "beneficio.service -> createBeneficio");
  }
}

/**
 * Obtiene un beneficio por su id de la base de datos
 * @param {string} Id del beneficio
 * @returns {Promise} Promesa con el objeto de beneficio
 */
async function getBeneficioById(id) {
  try {
    const beneficio = await Beneficio.findById({ _id: id })
      .exec();

    if (!beneficio) return [null, "El beneficio no existe"];

    return [beneficio, null];
  } catch (error) {
    handleError(error, "beneficio.service -> getBeneficioById");
  }
}

/**
 * Actualiza un beneficio por su id en la base de datos
 * @param {string} id Id del beneficio
 * @param {Object} beneficio Objeto de beneficio
 * @returns {Promise} Promesa con el objeto de beneficio actualizado
 */
async function updateBeneficio(id, beneficio) {
  try {
    const beneficioFound = await Beneficio.findById(id);
    if (!beneficioFound) return [null, "El beneficio no existe"];

    const { beneficioname, descripcion } = beneficio;

    const beneficioUpdated = await Beneficio.findByIdAndUpdate(
      id,
      {
        beneficioname,
        descripcion,
      },
      { new: true },
    );

    return [beneficioUpdated, null];
  } catch (error) {
    handleError(error, "beneficio.service -> updateBeneficio");
  }
}

/**
 * Elimina un beneficio por su id de la base de datos
 * @param {string} Id del beneficio
 * @returns {Promise} Promesa con el objeto de beneficio eliminado
 */
async function deleteBeneficio(id) {
  try {
    return await Beneficio.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "beneficio.service -> deletebeneficio");
  }
}

module.exports = {
  getBeneficios,
  createBeneficio,
  getBeneficioById,
  updateBeneficio,
  deleteBeneficio,
};
