const mongoose = require('mongoose');

// Load product model
const Product = require('../models/product');

// Image upload
const { upload } = require("../utils");

exports.index = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({success: true, products});
  } catch (err) {
    res.status(500).json(error);
  }
};

exports.new = (req, res, next) => {
  upload(req, res, (err) => {
    if(err){
      err.message
        ? res.json({success: false, message: 'Max Zise is 1mb'})
        : res.json({success: false, message: err})
    } else {
      if(req.file == undefined){
        res.json({success: false, message: 'The image is required'})
      } else {
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            image: req.file.path
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
      }
    }
  });
};

exports.update = async (req, res, next) => {
  try {
    const productData = req.body;
    const product = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: productData
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
