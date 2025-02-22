require('dotenv').config();
const express = require('express');
const { UA } = require('sip.js'); // ✅ Correct import for SIP.js

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());

// ✅ Load SIP Credentials from `.env`
const SIP_USERNAME = process.env.SIP_USERNAME;
const SIP_PASSWORD = process.env.SIP_PASSWORD;
const SIP_DOMAIN = process.env.SIP_DOMAIN;

// ✅ Check if SIP credentials exist
if (!SIP_USERNAME || !SIP_PASSWORD || !SIP_DOMAIN) {
    console.error("❌ Missing SIP credentials in .env file!");
    process.exit(1);
}

// ✅ Create SIP User Agent for Outbound Calls
const userAgent = new UA({
    uri: `sip:${SIP_USERNAME}@${SIP_DOMAIN}`,
    transportOptions: {
        wsServers: ["wss://sip.didlogic.net:7443"], // ✅ Secure WebSocket Connection
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

// ✅ API Route: Initiate a Spoofed Outbound Call
app.post("/api/spoof", async (req, res) => {
    try {
        const { targetNumber, spoofedCallerID } = req.body;

        if (!targetNumber || !spoofedCallerID) {
            return res.status(400).json({ error: "❌ Missing required fields: targetNumber & spoofedCallerID" });
        }

        console.log(`🚀 Initiating spoofed call from ${spoofedCallerID} to ${targetNumber}`);

        const session = userAgent.invite(`sip:${targetNumber}@${SIP_DOMAIN}`, {
            fromUri: `sip:${spoofedCallerID}@${SIP_DOMAIN}`,
        });

        res.json({ message: `📞 Spoofed call from ${spoofedCallerID} to ${targetNumber} initiated!` });
    } catch (error) {
        console.error("❌ SIP Call Error:", error);
        res.status(500).json({ error: "❌ Failed to initiate spoofed call", details: error.toString() });
    }
});

// ✅ API Route: Check if Backend is Running
app.get("/", (req, res) => {
    res.send("🔥 GhostSpoof Backend is Running!");
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
