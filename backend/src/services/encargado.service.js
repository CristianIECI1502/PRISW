"use strict";
// Importa el modelo de datos 'encargado'
const Encargado = require("../models/encargado.model.js");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos los encargado de la base de datos
 * @returns {Promise} Promesa con el objeto de los encargado
 */
async function getEncargados() {
  try {
    const encargados = await Encargado.find();
    if (!encargados) return [null, "No hay encargado"];

    return [encargados, null];
  } catch (error) {
    handleError(error, "encargado.service -> getEncargados");
  }
}

/**
 * Crea un nuevo encargado en la base de datos
 * @param {Object} encargado Objeto de encargado
 * @returns {Promise} Promesa con el objeto de encargado creado
 */
async function createEncargado(encargado) {
  try {
    const { nombre, apellido } = encargado;

    const encargadoFound = await Encargado.findOne({ nombre: Encargado.nombre });
    if (encargadoFound) return [null, "El encargado ya existe"];

    const newEncargado = new Encargado({
        nombre, 
        apellido, 
    });
    await newEncargado.save();

    return [newEncargado, null];
  } catch (error) {
    handleError(error, "encargado.service -> createEncargado");
  }
}

/**
 * Obtiene un encargado por su id de la base de datos
 * @param {string} Id del encargado
 * @returns {Promise} Promesa con el objeto de encargado
 */
async function getEncargadoById(id) {
  try {
    const encargado = await Encargado.findById({ _id: id })
      .exec();

    if (!encargado) return [null, "El encargado no existe"];

    return [encargado, null];
  } catch (error) {
    handleError(error, "encargado.service -> getEncargadoById");
  }
}

/**
 * Actualiza un encargado por su id en la base de datos
 * @param {string} id Id del encargado
 * @param {Object} encargado Objeto de encargado
 * @returns {Promise} Promesa con el objeto de encargado actualizado
 */
async function updateEncargado(id, encargado) {
  try {
    const encargadoFound = await Encargado.findById(id);
    if (!encargadoFound) return [null, "El encargado no existe"];
    const { nombre, apellido } = encargado;
    const encargadoUpdated = await Encargado.findByIdAndUpdate(
      id,
      {
        nombre, 
        apellido,
      },
      { new: true },
    );

    return [encargadoUpdated, null];
  } catch (error) {
    handleError(error, "encargado.service -> updateEncargado");
  }
}

/**
 * Elimina un encargado por su id de la base de datos
 * @param {string} Id del encargado
 * @returns {Promise} Promesa con el objeto de encargado eliminado
 */
async function deleteEncargado(id) {
  try {
    return await Encargado.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "encargado.service -> deleteEncargado");
  }
}

module.exports = {
  getEncargados,
  createEncargado,
  getEncargadoById,
  updateEncargado,
  deleteEncargado,
};
