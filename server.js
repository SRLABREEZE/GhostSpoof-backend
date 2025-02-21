import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("🔥 GhostSpoof Backend Running...");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
