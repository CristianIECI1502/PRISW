"use strict";
const mongoose = require("mongoose");

const beneficioBodySchema = new mongoose.Schema({
  beneficioname: {
    type: String,
    required: true,
    maxlength: 20,
    validate: {
      validator: function(value) {
        // Validar que no haya símbolos en beneficioname
        return /^[a-zA-Z0-9 ]*$/.test(value);
      },
      message: "El beneficioname no puede contener símbolos.",
    },
  },
  descripcion: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
    validate: {
      validator: function(value) {
        // Validar que no haya símbolos en descripción
        return /^[a-zA-Z0-9 ]*$/.test(value);
      },
      message: "La descripción no puede contener símbolos.",
    },
  },
  empresaAsociada: {
    type: String,
    required: true,
    maxlength: 20,
    validate: {
      validator: function(value) {
        // Validar que no haya símbolos en empresaAsociada
        return /^[a-zA-Z0-9 ]*$/.test(value);
      },
      message: "La empresaAsociada no puede contener símbolos.",
    },
  },
  descuento: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  fechaInicio: {
    type: Date,
    required: true,
    get: function(value) {
      // Formatear la fecha en el modelo
      return value.toLocaleDateString("es-ES");
    },
  },
  fechaFin: {
    type: Date,
    required: true,
    get: function(value) {
      // Formatear la fecha en el modelo
      return value.toLocaleDateString("es-ES");
    },
  },
});

const Beneficio = mongoose.model("Beneficio", beneficioBodySchema);
module.exports = Beneficio;
