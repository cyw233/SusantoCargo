const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");


// Get Shipping mongo model
const Shipping = require("../../models/Shipping");
// Load User mongo model
const User = require("../../models/User");

// Validation
const validateShippingInput = require("../../validation/shipping");

// @route  Get api/shippings
// @desc   Get shippings
// @access Public
router.get("/", (req, res) => {
  Shipping.find()
    .sort({ date: -1 }) // sort by the date from early to old
    .then(shippings => res.json(shippings))
    .catch(err => res.status(404).json({ noshippingsfound: "No shippings found" }));
});


// @route  Get api/shippings/:id
// @desc   Get a shipping by id
// @access Private
router.get(
  "/:id", 
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
  Shipping.findById(req.params.id)
    .then(shipping => res.json(shipping))
    .catch(err =>
      res.status(404).json({ noshippingfound: "No shipping found with that ID" })
    );
});


// @route  POST api/shippings
// @desc   Create shipping
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Check validation
    // const { errors, isValid } = validateShippingInput(req.body);
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    const newShipping = new Shipping({
      number: req.body.number,
      destination: req.body.destination,
      origin: req.body.origin,
      shipmentinformation: req.body.shipmentinformation,
      message: req.body.message,
      user: req.user.id
    });

    newShipping.save().then(shipping => res.json(shipping));
  }
);


module.exports = router;