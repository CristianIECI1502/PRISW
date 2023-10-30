"use strict";

const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
    {
        nombre: {
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
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
);
const Form = mongoose.model("Form", formSchema);

module.exports = Form;
