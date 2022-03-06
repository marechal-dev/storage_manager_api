const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  price: {
    type: Number,
    min: 1,
    required: true,
  },
  quantity: {
    type: Number,
    min: 1,
    required: true,
  },
}, {
  timestamps: true,
});

const product = mongoose.model("Product", productSchema);

module.exports = product;
