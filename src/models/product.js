const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'The name is required']
  },
  price: {
    type: Number,
    trim: true,
    required: [true, 'The price is required']
  },
  image: {
    type: String,
    required: [true, 'The image is required.']
  }
});

module.exports = mongoose.model('Product', ProductSchema);