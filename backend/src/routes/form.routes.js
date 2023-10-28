"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de autenticación */
const formController = require("../controllers/form.controller");

/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para la autenticación
router.Post("/form", formController.createForm);
router.Get("/forms", formController.getForm);
router.Get("/form/:id", formController.idForm);
router.Delete("/delform/:id", formController.delForm);

// Exporta el enrutador
module.exports = router;
