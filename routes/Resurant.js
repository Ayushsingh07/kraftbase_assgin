const express = require('express');
const router = express.Router();
const Restaurant = require('../modules/restaurantModel');
const Order = require('../modules/orderModel');

const DeliveryAgent = require('../modules/deliveryAgent'); 



async function assignDeliveryAgent(orderId) {
    try {
        // Find the first available delivery agent
        const deliveryAgent = await DeliveryAgent.findOne({ available: true });

        // If no available delivery agent found, return null
        if (!deliveryAgent) {
            return null;
        }

        // Update the delivery agent availability to false (assigned)
        deliveryAgent.available = false;
        await deliveryAgent.save();

        // Return the assigned delivery agent
        return deliveryAgent;
    } catch (error) {
        console.error("Error assigning delivery agent:", error);
        throw error;
    }
}

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
        const assignedAgent = await assignDeliveryAgent(order._id); // Call assignDeliveryAgent function locally

        if (!assignedAgent) {
            return res.status(500).json({ error: "No available delivery agents" });
        }

        // Update order status and assigned delivery agent
        order.status = "Accepted";
        order.deliveryAgent = assignedAgent._id; 
        await order.save();

        res.json(order);
    } catch (error) {
        console.error("Error accepting orders:", error);
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

router.get('/ord/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        // Find the order by its ID
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        console.error("Error retrieving order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



module.exports = router;
