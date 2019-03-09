const Validator = require('validator');
const isEmpty = require('./is-empty');
const fs = require('fs');
const path = require('path');

module.exports = function validateProductInput(data) {
  let errors = {};

  data.name = !isEmpty(data.body.name) ? data.body.name : '';
  data.price = !isEmpty(data.body.price) ? data.body.price : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = 'Price field is required';
  }

  if (data.body.image === '' || data.body.image === 'undefined') {
    errors.image = 'Image field is required';
  } 

  if (data.file) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(data.file.originalname).toLowerCase());
    if (!extname) {
      errors.image = 'Images Only!';
      fs.unlink(data.file.path, (err) => {
        if (err) {
          console.log(err)
          return
        }
        //file removed
      })
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}