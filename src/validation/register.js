const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.paternalSurname = !isEmpty(data.paternalSurname) ? data.paternalSurname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = 'Name must be between 3 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.paternalSurname)) {
    errors.paternalSurname = 'Paternal Surname field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, {min: 5, max: 12})) {
    errors.password = 'Password must be at least 5 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}