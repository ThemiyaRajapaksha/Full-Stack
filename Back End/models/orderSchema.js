const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  orderItems: [{
    itemName: String 
  }],
  orderDate: {
    type: Date,
    default: Date.now
  },
 
});

module.exports = mongoose.model('Order', orderSchema);
