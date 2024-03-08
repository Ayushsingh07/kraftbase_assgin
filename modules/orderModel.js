const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // Other fields...
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Completed', 'Rejected'], // Add 'Rejected' as a valid enum value
        default: 'Pending' // Set the default status to 'Pending'
    },
    // Other fields...
});

module.exports = mongoose.model('Order', orderSchema);
