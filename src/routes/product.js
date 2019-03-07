const express = require('express');
const router = express.Router();

// Authorize route
const passport = require('passport');
const passportAuth = passport.authenticate('jwt', { session: false });

// Controller CRUD
const productController = require('../controllers/product');

router
  .get('/', passportAuth, productController.index)
  .post('/', passportAuth, productController.new, )
  .put('/:id', passportAuth, productController.update)
  .delete('/:id', passportAuth, productController.delete)

module.exports = router;
