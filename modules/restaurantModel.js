const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: { type: String, required: true },
    menu: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true }
        }
    ],
    online: { type: Boolean, default: false }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
