"use strict";

const Form = require("../models/form.model");
const Status = require("../models/status.model");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos los Formularios de la base de datos
 * @returns {Promise} Promesa con el objeto de los fromularios
 */
async function getForms() {
    try {
        const formData = await Form.find()
            .select("estado +status")
            .select("nombre")
            .populate("dateSubmitted")
            .populate("status", "name -_id")
            .exec();
        if (!formData) return [null, "No hay formularios"];

        return [formData, null];
        } catch (error) {
            handleError(error, "user.service -> getUsers");
        }
};

/**
 * Crea un nuevo formulario en la base de datos
 * @param {Object} form Objeto de fromulario
 * @returns {Promise} Promesa con el objeto de formulario creado
 */
async function createForm(form) {
    try {
        const { nombre, email, phoneNumber, address, message } = form;

        const formFound = await Form.findOne({ email: form.email });
        if (formFound) return [null, "El postulante ya existe"];

        const newForm = new Form({
            nombre,
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

        const { status } = form;

        const statusFound = await Status.find( { name: { $in: status } } );
        if (statusFound.length === 0) return [null, "El estado no existe"];
        const myStatus = statusFound.map((status) => status._id);
        
        const formUpdated = await Form.findByIdAndUpdate(
            id,
            {
                status: myStatus,
            },
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
