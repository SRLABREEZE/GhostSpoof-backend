import { UserAgent, UserAgentOptions, Invitation, Registerer, Inviter, Message, SessionState } from 'sip.js';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// ✅ **SIP Credentials from `.env`**
const SIP_USERNAME = process.env.SIP_USERNAME;
const SIP_PASSWORD = process.env.SIP_PASSWORD;
const SIP_DOMAIN = process.env.SIP_DOMAIN;

// ✅ **Create SIP UserAgent**
const userAgentOptions = {
    uri: `sip:${SIP_USERNAME}@${SIP_DOMAIN}`,
    transportOptions: {
        server: "wss://sip.didlogic.net:7443", // Secure WebSocket connection
    },
    authorizationUsername: SIP_USERNAME,
    authorizationPassword: SIP_PASSWORD,
};

const userAgent = new UserAgent(userAgentOptions);

// ✅ **Register the SIP UserAgent**
const registerer = new Registerer(userAgent);
registerer.register().then(() => {
    console.log("📞 SIP Registered with DIDLogic!");
}).catch((error) => {
    console.error("❌ SIP Registration Failed:", error);
});

// ✅ **API Route to Initiate Outbound Calls**
app.post("/api/spoof", async (req, res) => {
    const { targetNumber, spoofedCallerID } = req.body;

    if (!targetNumber || !spoofedCallerID) {
        return res.status(400).json({ error: "Missing required parameters: targetNumber, spoofedCallerID" });
    }

    try {
        // ✅ **Create an Outbound SIP Call**
        const inviter = new Inviter(userAgent, `sip:${targetNumber}@${SIP_DOMAIN}`);
        
        inviter.stateChange.addListener((state) => {
            console.log(`📞 Call State Changed: ${state}`);

            if (state === SessionState.Established) {
                console.log(`✅ Call Connected to ${targetNumber}`);
            }
            if (state === SessionState.Terminated) {
                console.log(`❌ Call Ended`);
            }
        });

        await inviter.invite();
        res.json({ message: `📞 Calling ${targetNumber} with Spoofed Caller ID ${spoofedCallerID}` });

    } catch (error) {
        console.error("❌ Outbound Call Failed:", error);
        res.status(500).json({ error: "Failed to make the call" });
    }
});

// ✅ **Health Check Route**
app.get("/health", (req, res) => {
    res.send("🔥 GhostSpoof Backend is Running!");
});

// ✅ **Start Express Server**
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
