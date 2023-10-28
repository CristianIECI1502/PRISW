"use strict";

// const { respondSuccess, respondError } = require("../utils/resHandler");
// const { handleError } = require("../utils/errorHandler");

const Form = require("../models/form.model");
// const User = require('../models/user.model');
// Get all forms

const createForm = (req, res) => {
    const { name, email, phoneNumber, address, message, dateSubmitted } = req.body;
    const newForm = new Form({
        name,
        email,
        phoneNumber,
        address,
        message,
        dateSubmitted,
        status: "pending",
    });
    newForm.save((err, post)=>{
        if (err) {
            return res.status(400).send({ message: "Error al crear el fromulario" });
        }
        return res.status(200).send(post);
    });
};

const getForm = (req, res) => {
    console.log(res);
    Post.find({ }).populate({ path: "form", select: "status" }).exec((err, post) => {
        if (err) {
            return res.status(400).send({ message: "No existen formularios" });
        }
        return res.status(200).send(post);
    });
};
const idForm = (req, res) => {
    const { id } = req.params;
    Post.findById(id).populate({ path: "form", select: "status" }).exec((err, post) => {
        if (err) {
            return res.status(400).send({ message: "Error al obtener el formulario" });
        }
        if (!post) {
            return res.status(404).send({ message: "Formulario no encontrado" });
        }
        return res.status(200).send(post);
    });
};
const delForm = (req, res) => {
    const { id } = req.params;
    Post.remove({ _id: id }, (err) => {
        if (err) {
            return res.status(500).send({ message: "Error al eliminar el formulario" });
            }
            return res.status(200).send({ message: "Formulario eliminado correctamente" });
            });
};

module.exports = {
    createForm,
    getForm,
    idForm,
    delForm,
};
