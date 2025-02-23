exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    // Simple hardcoded authentication (Replace with DB check later)
    if (email === "test@example.com" && password === "123456") {
        res.json({ success: true, message: "Login successful", token: "dummy-token" });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
};
