"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de autenticación */
const formController = require("../controllers/form.controller");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para la autenticación
router.post("/", formController.createForm);
router.get("/", formController.getForms);
router.get("/:id", formController.getFormById);
router.delete("/:id", authorizationMiddleware.isAdmin, formController.deleteForm);
router.put("/:id", authorizationMiddleware.isAdmin, formController.updateForm);

// Exporta el enrutador
module.exports = router;
