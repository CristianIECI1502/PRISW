"use strict";

const Beneficio = require("../models/beneficio.model.js");
const { handleError } = require("../utils/errorHandler");

/**
 * Expresión  para validar que no haya símbolos.
 */
const noSymbolsRegex = /^[a-zA-Z0-9 ]*$/;

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
    const { beneficioname, descripcion, empresaAsociada, 
           descuento, fechaInicio, fechaFin } = beneficio;

    // Validaciones
    if (!noSymbolsRegex.test(beneficioname)) {
      return [null, "El nombre de beneficio no puede contener símbolos."];
    }

    if (!noSymbolsRegex.test(descripcion)) {
      return [null, "La descripción no puede contener símbolos."];
    }

    if (!noSymbolsRegex.test(empresaAsociada)) {
      return [null, "El nombre de la empresa o tienda no puede contener símbolos."];
    }

    const beneficioFound = await Beneficio.findOne({ beneficioname });
    if (beneficioFound) return [null, "El beneficio ya existe"];

    const newBeneficio = new Beneficio({
      beneficioname,
      descripcion,
      empresaAsociada,
      descuento,
      fechaInicio,
      fechaFin,
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

    // Validaciones
    if (!noSymbolsRegex.test(beneficioname)) {
      return [null, "El nombre de beneficio no puede contener símbolos."];
    }

    if (!noSymbolsRegex.test(descripcion)) {
      return [null, "La descripción no puede contener símbolos."];
    }

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
