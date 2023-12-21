"use strict";

const Form = require("../models/form.model");
const Status = require("../models/status.model");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos los Formularios de la base de datos
 * @param {Object} filters - Filtros para la búsqueda
 * @returns {Promise} Promesa con el objeto de los formularios
 */
async function getForms(filters) {
    try {
        const query = Form.find();

        if (filters.nombre) {
            query.where("nombre").equals(filters.nombre);
        }

        if (filters.status) {
            query.where("status").equals(filters.status);
        }

        if (filters.rut) {
            query.where("rut").equals(filters.rut);
        }

        const formData = await query
            .select("estado +status")
            .select("nombre")
            .select("rut")
            .populate("dateSubmitted")
            .populate("dateModified")
            .populate("status", "name -_id")
            .exec();

        if (!formData) return [null, "No hay formularios"];

        return [formData, null];
    } catch (error) {
        handleError(error, "form.service -> getForms");
    }
};

/**
 * Crea un nuevo formulario en la base de datos
 * @param {Object} form Objeto de fromulario
 * @returns {Promise} Promesa con el objeto de formulario creado
 */
async function createForm(form) {
    try {
        const { nombre, rut, email, phoneNumber, address, message } = form;

        const formFound = await Form.findOne({ rut: form.rut });
        if (formFound) return [null, "El postulante ya existe"];

        const newForm = new Form({
            nombre,
            rut,
            email,
            phoneNumber,
            address,
            message,
        });
        await newForm.save();

        return [newForm, null];
    } catch (error) {
        handleError(error, "form.service -> createForm");
    }
}

/**
 * Obtiene un formulario por su id en la base de datos
 * @param {String} Id Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
async function getFormById(id) {
    try {
        const form = await Form.findById({ _id: id })
        .populate("status", "-_id")
        .populate("dateSubmitted")
        .exec();

        if (!form) return [null, "No se encontró el formulario"];

        return [form, null];
        } catch (error) {
            handleError(error, "form.service -> getFormById");
        }
}

/**
 * Actualiza un formulario por su id en la base de datos
 * @param {string} id Id del formulario
 * @param {Object} form Objeto de formulario
 * @returns {Promise} Promesa con el objeto de formulario actualizado
 */
async function updateForm(id, form) {
    try {
        const formFound = await Form.findById(id);
        if (!formFound) return [null, "No se encontró el formulario a actualizar"];

        const { status, name = formFound.nombre } = form;

        const statusFound = await Status.find( { name: { $in: status } } );
        if (statusFound.length === 0) return [null, "El estado no existe"];
        const myStatus = statusFound.map((status) => status._id);
        
        // Actualiza la fecha de modificación
        form.dateModified = Date.now();

        const updateData = { status: myStatus, dateModified: form.dateModified, name };

        const formUpdated = await Form.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true },
        );

        return [formUpdated, null];
    } catch (error) {
        handleError(error, "form.service -> updateForm");
    }
}
/**
 * Elimina un formulario por su id de la base de datos
 * @param {string} Id del formulario
 * @returns {Promise} Promesa con el objeto de formulario eliminado
 */
async function deleteForm(id) {
    try {
        return await Form.findByIdAndDelete(id);
        } catch (error) {
            handleError(error, "form.service -> deleteForm");
        }
}

module.exports = {
    getForms,
    createForm,
    getFormById,
    updateForm,
    deleteForm,
};
