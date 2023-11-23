"use strict";

const mongoose = require("mongoose");
const STATUS = require("../constants/status.constants");

// Crea esquema de 'status'
const statusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: STATUS,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;
