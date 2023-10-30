"use strict";
const mongoose = require("mongoose");

const beneficioSchema = new mongoose.Schema({
        beneficioname: {
            type: String,
        required: true,
        },
        descripcion: {
            type: String,
            required: true,
        },
    },
);

const Beneficio = mongoose.model("Beneficio", beneficioSchema);
module.exports = Beneficio;
