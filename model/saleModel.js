const { default: mongoose } = require("mongoose");
const mongoos = require("mongoose");

const saleSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerNumber: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
    required: true,
  },
  productName: String,
  description: String,
  quantity: Number,
  price: Number
});

const Sale = mongoose.model('Sale', saleSchema)
module.exports = Sale;
