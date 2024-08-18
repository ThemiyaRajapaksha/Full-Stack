const express = require('express');
const Order = require('./models/orderSchema'); 

const router = express.Router();

router.post('/api/orders', async (req, res) => {
    try {
      const { customerName, deliveryAddress, orderItems, email } = req.body;
  
      if (!customerName || !deliveryAddress || !orderItems || !orderItems.length) {
        return res.status(400).json({ message: 'Missing required order details' });
      }
  
   
      const newOrder = new Order({
        customerName,
        deliveryAddress,
        orderItems: orderItems.map(itemName => ({ itemName })), 
        orderDate: new Date(),
        email:email
      });

  
      await newOrder.save();
  
      res.status(201).json(newOrder); 
    } catch (error) {
        console.log(error.message)
      res.status(500).json({ message: 'Error processing request', error: error.message });
    }
  });
  
  



  

module.exports = router;
