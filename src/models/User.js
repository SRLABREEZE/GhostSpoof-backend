const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    callMinutes: { type: Number, default: 0 }, // Call balance
    referralCode: { type: String, unique: true }
});

module.exports = mongoose.model('User', UserSchema);
