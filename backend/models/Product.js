// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  baseMultiplier: {
    type: Number,
    required: true,
    min: 1
  },
  images: {
    gold: {
      type: String,
      required: true
    },
    silver: {
      type: String,
      required: true
    },
    rose: {
      type: String,
      required: true
    }
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('Product', productSchema);