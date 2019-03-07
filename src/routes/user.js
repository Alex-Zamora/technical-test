const express = require('express');
const router = express.Router();

// Authorize route
const passport = require('passport');
const passportAuth = passport.authenticate('jwt', { session: false });

// User Controller 
const userController = require('../controllers/user');

router
  .post('/register', userController.register)
  .post('/login', userController.login)
  .get('/current', passportAuth, userController.current)

module.exports = router;