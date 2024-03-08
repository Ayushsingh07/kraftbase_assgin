const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Order = require('../modules/orderModel');

router.use(bodyParser.json());

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
