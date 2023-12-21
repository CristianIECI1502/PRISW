"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const EmailService = require("../services/email.service");

/**
 * Envia un correo electrónico
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function sendEmail(req, res) {
    try {
        const { email, status } = req.body;
        await EmailService.sendEmail(email, status);
        respondSuccess(req, res, 200, { message: "Email sent successfully" });
    } catch (error) {
        handleError(error, "email.controller -> sendEmail");
        respondError(req, res, 500, "No se pudo enviar el correo electrónico");
    }
}

module.exports = {
    sendEmail,
};
