require('dotenv').config();
const express = require('express');
const SIP = require('sip.js'); // Ensure SIP.js is installed

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// DIDLogic SIP Credentials
const SIP_USERNAME = "admin@ghostspoof.com";
const SIP_PASSWORD = "#SanaaSamari0517";
const SIP_DOMAIN = "sip.didlogic.net"; // Check if this is the correct domain

// Create SIP User Agent
const userAgent = new SIP.UA({
    uri: `sip:${SIP_USERNAME}@${SIP_DOMAIN}`,
    transportOptions: {
        wsServers: ["wss://sip.didlogic.net:7443"], // Secure WebSocket connection for SIP
    },
    authorizationUser: SIP_USERNAME,
    password: SIP_PASSWORD,
    sessionDescriptionHandlerFactoryOptions: {
        peerConnectionOptions: {
            rtcConfiguration: {
                iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
            }
        }
    }
});

// Handle Incoming Calls
userAgent.on('invite', (session) => {
    console.log("Incoming call from:", session.remoteIdentity.uri.toString());
    session.accept();
});

// API Routes
app.get("/", (req, res) => {
    res.send("🔥 GhostSpoof Backend is Running!");
});

app.get("/api/spoof", (req, res) => {
    res.json({ message: "🔥 Spoofing API is active!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🔥 GhostSpoof Backend Running on Port ${PORT}`);
});
