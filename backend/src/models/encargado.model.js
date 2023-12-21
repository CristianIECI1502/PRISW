"use strict";
const mongoose = require("mongoose");

const encargadoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        apellido: {
            type: String,
            required: true,
        },
        beneficio: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Beneficio",
            },
          ],
    },
);

const Encargado = mongoose.model("Encargado", encargadoSchema);
module.exports = Encargado;
