const User = require('../models/User');

const addReferral = async (req, res) => {
    try {
        const { referrerEmail, newUserEmail } = req.body;

        // Find the referrer
        const referrer = await User.findOne({ email: referrerEmail });
        if (!referrer) {
            return res.status(404).json({ message: "Referrer not found" });
        }

        // Check if new user exists
        const newUser = await User.findOne({ email: newUserEmail });
        if (!newUser) {
            return res.status(404).json({ message: "New user not found" });
        }

        // Add 3 bonus minutes to the referrer
        referrer.availableMinutes += 3;
        referrer.referrals += 1;
        await referrer.save();

        res.status(200).json({ message: "Referral successful! Referrer received 3 bonus minutes." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addReferral };
