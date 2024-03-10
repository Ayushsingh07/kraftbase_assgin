const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Order = require('../modules/orderModel');
const DeliveryAgent = require('../modules/deliveryAgent'); 

router.use(bodyParser.json());


router.post('/add', async (req, res) => {
    const { name, available } = req.body;

    try {
        //new delivery agent
        const newDeliveryAgent = new DeliveryAgent({
            name,
            available
        });

        // Save the new delivery agent to the database
        await newDeliveryAgent.save();

        res.status(201).json(newDeliveryAgent);
    } catch (error) {
        console.error("Error adding new delivery agent:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



router.put('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        // Update delivery status of order
        const order = await Order.findByIdAndUpdate(orderId, { $set: { status } }, { new: true });

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;
