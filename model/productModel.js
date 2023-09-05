const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image:{
    type: String,
    required: true,
  },
  supplierName: {
    type: String,
    required: true
  },
  supplierEmail: {
    type: String,
    required: true
  },
  supplierNumber: {
    type: String,
    required: true
  },
  supplierAddress: {
    type: String,
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
   
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
