const User = require('../models/user'); // Ensure correct path

// Register new user & give free 5 minutes
const registerUser = async (req, res) => {
    try {
        const { username, email, password, referralCode } = req.body;

        // Check if user exists
        let existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Create new user
        const newUser = new User({
            username,
            email,
            password, // Hash password before saving in actual implementation
            callMinutes: 5, // Free 5 minutes on signup
            referralCode: generateReferralCode(), // Generate unique referral code
        });

        await newUser.save();

        // Handle referral reward
        if (referralCode) {
            let referrer = await User.findOne({ referralCode });
            if (referrer) {
                referrer.callMinutes += 5; // Reward referral bonus
                await referrer.save();
            }
        }

        return res.status(201).json({ message: "User registered successfully with 5 free minutes!" });

    } catch (error) {
        res.status(500).json({ message: "Server error during registration" });
    }
};

// Generate unique referral code
const generateReferralCode = () => {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
};

module.exports = { registerUser };
