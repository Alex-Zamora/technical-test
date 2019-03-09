const express = require('express');
const router = express.Router();

// Authorize route
const passport = require('passport');
const passportAuth = passport.authenticate('jwt', { session: false });

// Controller CRUD
const productController = require('../controllers/product');

// Image upload
const { upload } = require("../utils");

router
  .get('/', passportAuth, productController.index)
  .post('/', passportAuth, upload.single('image'), productController.new)
  .get('/:id', passportAuth, productController.getOne)
  .put('/:id', passportAuth, upload.single('image'), productController.update)
  .delete('/:id', passportAuth, productController.delete)

module.exports = router;
