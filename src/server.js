const express = require('express');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const app = express();

// DB Connect
const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 3000);

// VIEWS EJS 
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
app.use('/products', require('./routes/product'));
app.use('/users', require('./routes/user'));

// Static files
app.use(express.static(path.join(__dirname, '/public')));

app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});