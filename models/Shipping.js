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
  shipmentinformation: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  // departure: {
  //   type: Date,
  //   required: true
  // },
  // arrival: {
  //   type: Date,
  //   required: true
  // },
  message: {
    type: String
  },
  acked: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  ack: {
    status: {
      type: String,
      default: "To be Approved"
    },
    pickuptime: {
      type: String,
      default: ""
    },
    cost: {
      type: Number
    },
    hbl: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    }
  }
});

module.exports = mongoose.model("shipping", ShippingSchema);
