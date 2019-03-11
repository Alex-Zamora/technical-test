const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// Load product model
const User = require('../models/user');

// Load input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// @route POST users/register
// @desc Register user
// @access Public
exports.register = (req, res) => {
  console.log(req.body);
  // Destructuring
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if(!isValid) {
    return res.status(402).json({success: false, errors});
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      console.log(user);
      if (user) {
        return res.status(402).json({ 
          success: false, 
          errors: {email:'Email already exist'} 
      });
      } else {
        console.log(req.body);
      
        const newUser = new User({
          name: req.body.name,
          paternalSurname: req.body.paternalSurname,
          email: req.body.email,
          password: req.body.password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.log(err);
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json({success: true, user}))
              .catch(err => console.log({success: false, err})); 
          })
        })
      }
    })
}

// @route GET users/login
// @desc Login user / Returning JWT Token
// @access Public
exports.login = (req, res) => {
  // Destructurin
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    res.status(402).json({success: false, errors});
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email })
    .then(user => {
      // Check for user
      if (!user) {
        errors.email = 'User not found'
        return res.status(404).json({succes: false, errors});
      }

      // Check Password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // User match
            // Create jwt payload
            const payload = { id: user.id, name: user.name, email: user.email } 

            // Sign Token
            // Expire in miliseconds
            jwt.sign(
              payload, 
              keys.secretOrKey, 
              { expiresIn: 43200 }, 
              (err, token) => {
                if (err) res.json({ sucess: false, err: err })
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
            });
          } else {
            errors.password = 'Password incorrect'
            return res.status(400).json({succes: false, errors});
          }
        })
    });
};

// @route GET users/current
// @desc Return current user
// @access Private
exports.current = (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
}