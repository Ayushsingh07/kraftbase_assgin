const express = require('express');
const router = express.Router();
const Restaurant = require('../modules/restaurantModel');
const Order = require('../modules/orderModel');
const deliveryAgentService = require('./deliveryAgentService');


// Get all orders for a specific restaurant
router.get('/orders/:restaurantId', async (req, res) => {
    const { restaurantId } = req.params;

    try {
        // Find all orders for the specified restaurant ID
        const orders = await Order.find({ restaurantId });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this restaurant" });
        }

        res.json(orders);
    } catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



router.post('/add', async (req, res) => {
    const { name, menu, online } = req.body;

    try {
        const restaurant = new Restaurant({
            name,
            menu,
            online
        });

        await restaurant.save();
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update menu
router.put('/:id/menu', async (req, res) => {
    const { id } = req.params;
    const { menu } = req.body;

    try {
        const restaurant = await Restaurant.findByIdAndUpdate(id, { menu }, { new: true });
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update availability status
router.put('/:id/availability', async (req, res) => {
    const { id } = req.params;
    const { online } = req.body;

    try {
        const restaurant = await Restaurant.findByIdAndUpdate(id, { online }, { new: true });
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update price of a dish in the menu
router.put('/:id/menu/:dishName', async (req, res) => {
    const { id, dishName } = req.params;
    const { price } = req.body;

    try {
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        const menu = restaurant.menu.map(item => {
            if (item.name === dishName) {
                item.price = price;
            }
            return item;
        });

        restaurant.menu = menu;
        await restaurant.save();

        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});



// Accept order
router.post('/:id/orders/accept', async (req, res) => {
    const { id } = req.params;

    try {
        // Find pending order for the restaurant
        const order = await Order.findOne({ restaurantId: id, status: "Pending" });

        if (!order) {
            return res.status(404).json({ error: "No pending orders for this restaurant" });
        }

        // Assign delivery agent
        const assignedAgent = await deliveryAgentService.assignDeliveryAgent(order._id);

        if (!assignedAgent) {
            return res.status(500).json({ error: "No available delivery agents" });
        }

        // Update order status and assigned delivery agent
        order.status = "Accepted";
        order.deliveryAgent = assignedAgent.name;
        await order.save();

        res.json(order);
    } catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Reject order
router.post('/:id/orders/reject', async (req, res) => {
    const { id } = req.params;

    try {
        // Find pending order for the restaurant
        const order = await Order.findOne({ restaurantId: id, status: "Pending" });

        if (!order) {
            return res.status(404).json({ error: "No pending orders for this restaurant" });
        }

        // Update order status
        order.status = "Rejected";
        await order.save();

        res.json(order);
    } catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
module.exports = router;
