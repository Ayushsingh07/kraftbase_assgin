const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deliveryAgentSchema = new Schema({
    name: { type: String, required: true },
    available: { type: Boolean, default: true },
    // Other delivery agent-related fields can be added here
});

const DeliveryAgent = mongoose.model('DeliveryAgent', deliveryAgentSchema);

module.exports = DeliveryAgent;
