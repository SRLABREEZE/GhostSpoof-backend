const User = require('../models/User');

const makeCall = async (req, res) => {
    try {
        const { userId, callDuration } = req.body;

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if user has enough minutes
        if (user.availableMinutes < callDuration) {
            return res.status(400).json({ message: "Not enough minutes!" });
        }

        // Deduct minutes
        user.availableMinutes -= callDuration;
        await user.save();

        res.status(200).json({ message: `Call started. Remaining minutes: ${user.availableMinutes}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { makeCall };
