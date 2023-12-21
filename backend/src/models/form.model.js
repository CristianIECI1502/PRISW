"use strict";

const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        rut: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        dateSubmitted: {
            type: Date,
            default: Date.now,
        },
        dateModified: {
            type: Date,
            default: Date.now,
        },
        status: 
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Status",
            default: "65552313bc0d5d7a9ddf4b81",
            },
        
    },
);

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
