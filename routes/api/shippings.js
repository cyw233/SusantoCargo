const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const nodemailer = require("nodemailer");


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
    const { errors, isValid } = validateShippingInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

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


// @route  POST api/shippings/create-ack/:shippingId
// @desc   Create ack
// @access Private
router.post(
  "/create-ack/:shippingId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Check validation
    // const { errors, isValid } = validateShippingInput(req.body);
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    Shipping.findOneAndUpdate(
      { _id: req.params.shippingId },
      { $set: { acked: true } },
      { new: true }
    )
    .then(shipping => res.json(shipping));

  }
);



// @route  POST api/shippings/edit-ack/:shippingId
// @desc   Edit ack
// @access Private
router.post(
  "/edit-ack/:shippingId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Check validation
    // const { errors, isValid } = validateShippingInput(req.body);
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    const newShipping = {};
    newShipping.number = req.body.number;
    newShipping.destination = req.body.destination;
    newShipping.origin = req.body.origin;
    newShipping.shipmentinformation = req.body.shipmentinformation;
    newShipping.message = req.body.shippingmessage;
    newShipping.user = req.body.user;
    newShipping.date = req.body.date;
    
    newShipping.ack = {};
    newShipping.ack.status = req.body.status;
    newShipping.ack.pickuptime = req.body.pickuptime;
    newShipping.ack.cost = req.body.cost;
    newShipping.ack.hbl = req.body.hbl;
    newShipping.ack.message = req.body.ackmessage;


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'chenyangw233@gmail.com',
        pass: 'WANGcy888' 
      }
    });

    Shipping.findOneAndUpdate(
      { _id: req.body.shipping },
      { $set: newShipping },
      { new: true }
    )
    .then(shipping => {
      User.findOne({ _id: req.body.user }).then(user => {
        // setup email data with unicode symbols
        let mailOptions = {
          from: 'noreply-susanto', // sender address
          to: user.email, // list of receivers
          subject: 'SusantoCargo - You Latest Shipping Information', // Subject line
          text: 'Hello world? Amazing', // plain text body
          html: `
            <h1>Your Order Ack Has Been Updated!<h1>
            <h3>Your Shipping Information:</h3>            
            <p><strong>Number</strong>: ${shipping.number}</p>
            <p><strong>From</strong>: ${shipping.origin}</p>
            <p><strong>To</strong>: ${shipping.destination}</p>
            <p><strong>Period</strong>: ${shipping.shipmentinformation}</p>
            <p><strong>Message</strong>: ${shipping.message}</p>
            <br/>
            <h3>Your Latest Ack:</h3>
            <p><strong>Status</strong>: ${req.body.status}</p>
            <p><strong>Pickup Time</strong>: ${req.body.pickuptime}</p>
            <p><strong>Cost</strong>: ${req.body.cost}</p>
            <p><strong>HBL Number</strong>: ${req.body.hbl}</p>
            <p><strong>Message</strong>: ${req.body.ackmessage}</p>
          `
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          return res.json(shipping)
        })
      })
    })
    // .then(shipping => res.json(shipping));

  }
);

module.exports = router;