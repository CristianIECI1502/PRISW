"use strict";
const express = require("express");
const emailController = require("../controllers/email.controller");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

const router = express.Router();

// Aplica el middleware de autenticación a todas las rutas
router.use(authenticationMiddleware);

// Define la ruta para enviar el correo electrónico
router.post("/", authorizationMiddleware.isAdmin, emailController.sendEmail);

// Exporta el enrutador
module.exports = router;
