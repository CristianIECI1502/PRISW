"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");
const rutasEncargado = require("./encargado.routes");
const rutasBeneficio = require("./beneficio.routes");

/** Controlador de usuarios */
const usuarioController = require("../controllers/user.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);
router.use("/:id/beneficio", rutasBeneficio);

// define las rutas para los usuarios
router.use("/:id/encargado", authorizationMiddleware.isAdmin, rutasEncargado);
router.get("/", usuarioController.getUsers);
router.post("/", authorizationMiddleware.isAdmin, usuarioController.createUser);
router.get("/:id", usuarioController.getUserById);
router.put(
  "/:id",
  authorizationMiddleware.isAdmin,
  usuarioController.updateUser,
);
router.delete(
  "/:id",
  authorizationMiddleware.isAdmin,
  usuarioController.deleteUser,
);

// Exporta el enrutador
module.exports = router;
