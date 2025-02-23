const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Temporary in-memory user (Replace with a database later)
const users = [
    { email: "test@example.com", password: "$2a$10$EXAMPLEHASHEDPASSWORD" } // Replace with real hashed password
];

// Login User Function
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Find user in database (temporary check)
    const user = users.find(user => user.email === email);
    
    if (!user) {
        return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    // Generate JWT Token
    const token = jwt.sign({ email: user.email }, "SECRET_KEY", { expiresIn: "1h" });

    res.json({ success: true, message: "Login successful!", token });
};
