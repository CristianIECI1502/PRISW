"use strict";

const nodemailer = require("nodemailer");
const { handleError } = require("../utils/errorHandler");

/**
 * Envia un correo electrónico
 * @param {string} email - Dirección de correo electrónico a la que se enviará el mensaje
 * @param {string} status - Estado que se incluirá en el mensaje del correo electrónico
 * @returns {Promise} Promesa con el resultado del envío del correo electrónico
 */
async function sendEmail(email, status) {
    try {
        const transporter = nodemailer.createTransport({
            service: "Outlook365",
            auth: {
                user: "correo.prueba06@outlook.com",
                pass: "Correodeprueba",
            },
        });

        const mailOptions = {
            from: "correo.prueba06@outlook.com",
            to: email,
            subject: "Notificación de cambio de estado",
            text: `El estado ha cambiado a ${status}`,
        };

        return await transporter.sendMail(mailOptions);
    } catch (error) {
        handleError(error, "email.service -> sendEmail");
    }
}

module.exports = {
    sendEmail,
};
