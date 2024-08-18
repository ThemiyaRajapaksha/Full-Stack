const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Menu item price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Menu item category is required'],
    enum: ['seafood', 'noodles', 'specials', 'burgers', 'pizza'], 
    trim: true
  },
  image: {
    type: String,
    default: null 
  }
}, {
  timestamps: true 
});


const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
