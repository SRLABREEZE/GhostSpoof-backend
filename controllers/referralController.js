const User = require('../models/user');

const rewardReferral = async (req, res) => {
    try {
        const { userId, referralCode } = req.body;

        const referrer = await User.findOne({ referralCode });
        if (!referrer) return res.status(400).json({ message: "Invalid referral code" });

        referrer.callMinutes += 5; // Rewarding 5 extra minutes
        await referrer.save();

        return res.status(200).json({ message: "Referral bonus added!" });

    } catch (error) {
        res.status(500).json({ message: "Error processing referral reward" });
    }
};

module.exports = { rewardReferral };
