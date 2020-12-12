const Validator = require("validator");

const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {

  let errors = {};

  data.Login = !isEmpty(data.Login) ? data.Login : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.passwd = !isEmpty(data.passwd) ? data.passwd : "";
 
// Name checks
  if (Validator.isEmpty(data.Login)) {
    errors.name = "Login ID field is required";
  }

// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

// Password checks
  if (Validator.isEmpty(data.passwd)) {
    errors.password = "Password field is required";
  }

if (!Validator.isLength(data.passwd, { min: 3})) {
    errors.password = "Password must be at least 3 characters";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};