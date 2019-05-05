const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateUpdateInformation(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.home = !isEmpty(data.home) ? data.home : "";
  data.contact = !isEmpty(data.contact) ? data.contact : "";
  data.email = !isEmpty(data.email) ? data.email : "";


  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required!";
  }

  if (Validator.isEmpty(data.home)) {
    errors.home = "Home address is required!";
  }

  if (Validator.isEmpty(data.contact)) {
    errors.contact = "Contact number is required!";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required!";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
