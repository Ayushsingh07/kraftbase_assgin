const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    items: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true }
    }],
    deliveryAgent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryAgent' // Reference to the DeliveryAgent model
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Completed', 'Rejected'],
        default: 'Pending'
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
