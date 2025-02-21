require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const SIP_CONFIG = {
    username: process.env.SIP_USERNAME,
    password: process.env.SIP_PASSWORD,
    server: process.env.SIP_SERVER,
    port: process.env.SIP_PORT
};

console.log("Loaded SIP Config:", SIP_CONFIG);

require('dotenv').config();  // Load environment variables

const express = require('express');
const SIP = require('sip'); //SIP.js library
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// SIP Credentials
const sipUsername = process.env.DIDLOGIC_SIP_USERNAME;
const sipPassword = process.env.DIDLOGIC_SIP_PASSWORD;
const sipServer = process.env.DIDLOGIC_SIP_SERVER;

// Test Route
app.get("/", (req, res) => {
    res.send("🔥 GhostSpoof Backend is Running!");
});

// SIP Route - Just a placeholder, needs SIP integration logic
app.get("/connect-sip", (req, res) => {
    if (!sipUsername || !sipPassword) {
        return res.status(500).json({ error: "SIP credentials missing" });
    }
    res.json({
        message: "SIP Connection Initiated",
        username: sipUsername,
        server: sipServer
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🔥 GhostSpoof Backend Running on Port ${PORT}`);
});
