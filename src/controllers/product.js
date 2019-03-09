const mongoose = require('mongoose');

// Load product model
const Product = require('../models/product');

// Load input validation
const validateProductInput = require('../validation/product');

exports.index = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({success: true, products});
  } catch (err) {
    res.status(500).json(error);
  }
};

exports.new = (req, res, next) => {

  // Destructuring Validation
  const { errors, isValid } = validateProductInput(req);

  // Check Validation
  if(!isValid) {
    return res.status(402).json({success: false, errors});
  }

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    image: `/images/${req.file.filename}`
  });

  const error = product.validateSync();
  if (error) {
    const errors = Object.keys(error.errors).map( 
      key => error.errors[key].message
    );
    res.status(422).json({success: false, errors});
  } else {
    product
      .save()
      .then(product => res.status(200).json({ success: true, product }))
      .catch(err => {
        if ( err.errors ) {
          const errors = Object.keys(err.errors).map(
            key => err.errors[key].message
          );
          res.status(422).json({success: false, errors});
        } else {
          res.status(500).json({success: false, errors: err});
        }
      });
  }
};

exports.getOne = (req, res, next) => {
  Product.findById(req.params.id, function (err, product) {
    if (err) return next(err);
    res.status(200).json({ success: true,  product});
  });
};

exports.update = async (req, res, next) => {
  try {
    // Destructuring Validation
    const { errors, isValid } = validateProductInput(req);

    // Check Validation
    if(!isValid) {
      return res.status(402).json({success: false, errors});
    }
    
    const imageSelect = data => {
      if (data.file === undefined) {
        return req.body.image;
      } else {
        return `/images/${data.file.filename}`;
      }
    }

    let image = imageSelect(req);
    const { name, price } = req.body;
    const product = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: { name: name, price: price, image: image }
      }
    );
    product
      ? res.status(200).json({ success: true, product })
      : res.status(404).json({ success: false, message: 'Not found Product' })
  } catch (err) {
    res.status(500).json({ success: false, errors: err.message })
  }
};

exports.delete = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndRemove({
      _id: req.params.id
    });
    product
      ? res.status(200).json({ success: true, product })
      : res.status(404).json({ success: false, message: 'Not found Product' })
  } catch (err) {
    res.status(500).json({ success: false, errors: err.message })
  }
}
