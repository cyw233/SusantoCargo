const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateShippingInput(data) {
  let errors = {};

  data.number = !isEmpty(data.number) ? data.number : "";
  data.destination = !isEmpty(data.destination) ? data.destination : "";
  data.origin = !isEmpty(data.origin) ? data.origin : "";
  data.shipmentinformation = !isEmpty(data.shipmentinformation) ? data.shipmentinformation : "";


  if (Validator.isEmpty(data.number)) {
    errors.number = "Number of boxes is required!";
  }

  if (Validator.isEmpty(data.destination)) {
    errors.destination = "Destination is required!";
  }

  if (Validator.isEmpty(data.origin)) {
    errors.origin = "Pickup Address is required!";
  }

  if (Validator.isEmpty(data.shipmentinformation)) {
    errors.shipmentinformation = "You must select a departure date!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
