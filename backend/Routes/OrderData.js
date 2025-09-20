const express = require('express');
const router = express.Router(); 
const Order = require('../models/Orders');

// POST route to save new orders
router.post('/orderData', async (req, res) => {
  try {
    const { order_data, email, order_date } = req.body;
    
    // Create new order using Orders model
    const newOrder = new Order({
      email: email,
      order_data: order_data,
      order_date: order_date
    });
    
    await newOrder.save();
    res.status(200).json({ success: true, message: 'Order saved successfully' });
    
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ success: false, message: 'Failed to save order' });
  }
});

// GET route to retrieve user's orders
router.get('/myOrders/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email: email });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

module.exports = router;
