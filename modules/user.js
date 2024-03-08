const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // Other user-related fields can be added here
});

const User = mongoose.model('User', userSchema);

module.exports = User;
