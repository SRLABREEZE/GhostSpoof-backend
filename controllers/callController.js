const Call = require('../models/call');

const pricingPlans = {
    small: { minutes: 10, price: 1.00 },
    medium: { minutes: 25, price: 2.50 },
    large: { minutes: 50, price: 4.50 },
    extraLarge: { minutes: 120, price: 10.00 }
};

const calculateCost = (minutes) => {
    let plan = Object.values(pricingPlans).find(p => minutes <= p.minutes);
    return plan ? plan.price : null;
};

// Charge for calls
const chargeForCall = async (req, res) => {
    try {
        const { userId, callMinutes } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.callMinutes < callMinutes) return res.status(400).json({ message: "Not enough minutes" });

        user.callMinutes -= callMinutes;
        await user.save();

        return res.status(200).json({ message: `Call charged successfully. Remaining Minutes: ${user.callMinutes}` });

    } catch (error) {
        res.status(500).json({ message: "Error processing call charge" });
    }
};

module.exports = { chargeForCall };
