const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

 // Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateUpdateInformation = require('../../validation/update-information');
const validateResetPassword = require('../../validation/reset-password');

// Load User mongo model
const User = require("../../models/User");

// @route  POST api/users/register
// @desc   Register user
// @access Public
router.post("/register", (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      // see https://www.wpbeginner.com/beginners-guide/what-is-gravatar-and-why-you-should-start-using-it-right-away/
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        home: req.body.home,
        contact: req.body.contact,
        avatar,
        date: req.body.date
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(error => console.log(error));
        });
      });
    }
  });
});

// @route  POST api/users/login
// @desc   Login user / Return JWT token
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(400).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user._id, name: user.name, home: user.home, contact: user.contact, email: user.email, avatar: user.avatar };
        // Sign Token to the logged-in user
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Passowrd incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route  GET api/users/current
// @desc   Return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => { // get the user back from passport.js file
    const avatar = gravatar.url(req.body.email, {
      s: "200",
      r: "pg",
      d: "mm"
    });
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      home: req.user.home,
      contact: req.user.contact,
      avatar: avatar
    }); 
  }
);


// @route  POST api/users/updateinfo
// @desc   Update user information
// @access Public
router.post("/updateinfo", (req, res) => {
  const {errors, isValid} = validateUpdateInformation(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newInfo = {};
  newInfo.name = req.body.name;
  newInfo.home = req.body.home;
  newInfo.contact = req.body.contact;
  newInfo.email = req.body.email;
  newInfo.avatar = gravatar.url(req.body.email, {
    s: "200",
    r: "pg",
    d: "mm"
  });

  User.findOneAndUpdate(
    { _id: req.body.id },
    { $set: newInfo },
    { new: true }
  ).then(user => res.json(user));

});


// @route  POST api/users/resetpassword
// @desc   Reset password
// @access Private
router.post("/resetpassword", (req, res) => {
  const {errors, isValid} = validateResetPassword(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const resetUser = {};
  resetUser.email = req.body.email;
  resetUser.name = req.body.name;
  resetUser.home = req.body.home;
  resetUser.contact = req.body.contact;
  resetUser.avatar = gravatar.url(req.body.email, {
    s: "200",
    r: "pg",
    d: "mm"
  });
  resetUser.password = req.body.password;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(resetUser.password, salt, (err, hash) => {
      if (err) throw err;
      resetUser.password = hash;
      User.findOneAndUpdate(
        { _id: req.body.id },
        { $set: resetUser },
        { new: true }
      ).then(user => res.json(user));
    });
  });

});




module.exports = router;