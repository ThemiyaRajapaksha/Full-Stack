// models/Promotion.js

const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  name: String,
  imageUrl: String, 

});

module.exports = mongoose.model('Promotion', promotionSchema);
