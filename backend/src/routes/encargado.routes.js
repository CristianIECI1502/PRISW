"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Instancia del enrutador */
const router = express.Router();

const encargadoController = require("../controllers/encargado.controller");
const beneficioRoutes = require("../routes/beneficio.routes");
const authorizationAdmin = require("../middlewares/authorization.middleware");

router.use("/beneficio", beneficioRoutes);

// Define las rutas para los encargados
router.get("/GET", encargadoController.getEncargado);
router.post("/POST", authorizationAdmin.isAdmin, encargadoController.createEncargado);
router.get("/GET/:id", encargadoController.getEncargadoById);
router.put("/PUT/:id", authorizationAdmin.isAdmin, encargadoController.updateEncargado);
router.delete("/DELETE/:id", authorizationAdmin.isAdmin, encargadoController.deleteEncargado);

// Exporta el enrutador
module.exports = router;
