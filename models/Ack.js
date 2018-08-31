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
    type: String
  },
  cost: {
    type: Number,
    required: true
  },
  hbl: {
    type: String
  },
  message: {
    type: String
  }
});

module.exports = mongoose.model("ack", AckSchema);
