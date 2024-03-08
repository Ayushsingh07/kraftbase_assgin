const express = require('express');
const router = express.Router();
const Restaurant = require('../modules/restaurantModel');
const Order = require('../modules/orderModel');
const DeliveryAgent = require('../modules/deliveryAgent');


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
router.post('/ratings', async (req, res) => {
    try {
        const { orderId, deliveryAgentId, orderRating, deliveryAgentRating } = req.body;

        // Update order rating
        if (orderId && orderRating) {
            await Order.findByIdAndUpdate(orderId, { $set: { rating: orderRating } });
        }

        // Update delivery agent rating
        if (deliveryAgentId && deliveryAgentRating) {
            await DeliveryAgent.findByIdAndUpdate(deliveryAgentId, { $set: { rating: deliveryAgentRating } });
        }

        res.status(200).json({ message: "Ratings added successfully" });
    } catch (error) {
        console.error("Error adding ratings:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




module.exports = router;

module.exports = router;
