"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const FormService = require("../services/form.service");
const { formIdSchema, formBodySchema } = require("../schema/form.schema");
/**
 * obtiene todas las postulaciones
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getForms(req, res) {
    try {
        const [forms, errorForms] = await FormService.getForms();
        if (errorForms) return respondError(req, res, 404, errorForms);

        forms.length === 0
        ? respondSuccess(req, res, 204)
        : respondSuccess(req, res, 200, forms);
        } catch (error) {
            handleError(error, "form.controller -> getForms");
            respondError(req, res, 400, error.message);
        }
};

/**
 * Crea un formulario
 * @param {Object} req - Objeto de peticion
 * @param {Object} res - Objeto de respuesta
 */
async function createForm(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = formBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [newForm, formError] = await FormService.createForm(body);

        if (formError) return respondError(req, res, 400, formError);
        if (!newForm) {
            return respondError(req, res, 400, "No se creo formulario");
            }

            respondSuccess(req, res, 201, newForm);
        } catch (error) {
                handleError(error, "form.controller -> createForm");
                respondError(req, res, 500, "No se creo el formulario");
    }
}

/**
 * Obtiene un formulario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getFormById(req, res) {
    try {
        const { params } = req;
        const { error: paramError } = formIdSchema.validate(params);
        if (paramError) return respondError(req, res, 400, paramError.message);

        const [form, errorForm] = await FormService.getForms( params.id );

        if (errorForm) return respondError(req, res, 404, errorForm);

        respondSuccess(req, res, 200, form);
    } catch (error) {
        handleError(error, "form.controller -> getFormById");
        respondError(req, res, 500, "Ocurrio un error al obtener los datos del usuario");
    }
}
/**
 * Actualiza un formulario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateForm(req, res) {
    try {
        const { params, body } = req;
        const { error: paramError } = formIdSchema.validate(params);
        if (paramError) return respondError(req, res, 400, paramError.message);

        const { error: bodyError } = formBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [Form, formError] = await FormService.updateForm(params.id, body);

        if (formError) return respondError(req, res, 400, formError);

        respondSuccess(req, res, 200, Form);
    } catch (error) {
        handleError(error, "form.controller -> updateForm");
        respondError(req, res, 500, "No se actualizo el formulario");
    }
}

/**
 * Elimina un formulario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteForm(req, res) {
    try {
        const { params } = req;
        const { error: paramError } = formIdSchema.validate(params);
        if (paramError) return respondError(req, res, 400, paramError.message);

        const form = await FormService.deleteForm(params.id);
        !form
         ? respondError(
            req,
            res,
            404,
            `El formulario con id ${params.id} no existe o fue eliminado previamente`,
         )
         : respondSuccess(req, res, 200, form);
         } catch (error) {
            handleError(error, "form.controller -> deleteForm");
            respondError(req, res, 500, "No se elimino el formulario");
         }
    }

module.exports = {
    getForms,
    createForm,
    getFormById,
    updateForm,
    deleteForm,
    };
