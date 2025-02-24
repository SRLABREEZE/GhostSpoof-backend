const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    availableMinutes: { type: Number, default: 5 },  // ✅ 5 Free Minutes
    referrals: { type: Number, default: 0 }  // ✅ Track referrals
});

module.exports = mongoose.model('User', UserSchema);
