const express = require('express');
const router = express.Router();
const Restaurant = require('../modules/restaurantModel');
const Order = require('../modules/orderModel');

// Retrieve a list of all restaurants available online at the given hour
router.get('/restaurants', async (req, res) => {
    try {
        // Assuming you have a field called 'online' in the restaurant schema to indicate availability
        const currentHour = new Date().getHours();
        const availableRestaurants = await Restaurant.find({ online: true });
        res.json(availableRestaurants);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Place an order from the available restaurants
router.post('/order', async (req, res) => {
    const { restaurantId, items } = req.body;

    try {
        // Check if the restaurant is available
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant || !restaurant.online) {
            return res.status(404).json({ error: "Restaurant not available" });
        }

        // Place the order
        const order = new Order({
            restaurantId,
            items,
            status: "Pending" // Assuming the initial status of an order is 'Pending'
        });
        await order.save();
        
        res.status(201).json(order);
    } catch (error) {
        console.error("Error placing order:", error); // Log the error for debugging
        res.status(500).json({ error: "Internal server error" });
    }
});


// Allow users to leave ratings for their orders and delivery agents
router.post('/orders/:orderId/rate', async (req, res) => {
    const { orderId } = req.params;
    const { orderRating, deliveryAgentRating } = req.body;

    try {
        // Update order rating
        const order = await Order.findByIdAndUpdate(orderId, { orderRating }, { new: true });
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Update delivery agent rating
        // Assuming the delivery agent name is stored in the order document
        const deliveryAgent = await DeliveryAgent.findOneAndUpdate({ name: order.deliveryAgent }, { $push: { ratings: deliveryAgentRating } }, { new: true });
        if (!deliveryAgent) {
            return res.status(404).json({ error: "Delivery agent not found" });
        }

        res.json({ order, deliveryAgent });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
