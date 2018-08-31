const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ShippingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  number: {
    type: Number,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  departure: {
    type: Date,
    required: true
  },
  arrival: {
    type: Date,
    required: true
  },
  message: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("shipping", ShippingSchema);
