const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AckSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  shipping: {
    type: Schema.Types.ObjectId,
    ref: "shippings"
  },
  status: {
    type: String,
    required: true
  },
  pickuptime: {
    type: String,
    default: ""
  },
  cost: {
    type: Number,
    required: true
  },
  hbl: {
    type: String,
    default: ""
  },
  message: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("ack", AckSchema);
