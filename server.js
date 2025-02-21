app.get("/", (req, res) => {
    res.send("🔥 GhostSpoof Backend is Running!");
});require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Root Route - Confirms the server is running
app.get("/", (req, res) => {
    res.send("🔥 GhostSpoof Backend is Running!");
});

// API Route - Confirms API is active
app.get("/api/spoof", (req, res) => {
    res.json({ message: "🔥 Spoofing API is active!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🔥 GhostSpoof Backend Running on Port ${PORT}`);
});
