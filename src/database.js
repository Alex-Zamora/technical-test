const mongoose = require('mongoose');

const URI = 'mongodb://localhost/store';

mongoose.connect(URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;