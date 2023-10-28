const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const formSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: false,
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

module.exports = Form = mongoose.model("form", formSchema);
