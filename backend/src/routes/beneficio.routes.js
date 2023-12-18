"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Instancia del enrutador */
const router = express.Router();

const beneficioController = require("../controllers/beneficio.controller");
const authorizationAdmin = require("../middlewares/authorization.middleware");

// Define las rutas para los beneficios
router.get("/", beneficioController.getBeneficio);
router.post("/", authorizationAdmin.isAdmin, beneficioController.createBeneficio);
router.get("/:id", beneficioController.getBeneficioById);
router.put("/:id", authorizationAdmin.isAdmin, beneficioController.updateBeneficio);
router.delete("/:id", authorizationAdmin.isAdmin, beneficioController.deleteBeneficio);

// Exporta el enrutador
module.exports = router;
