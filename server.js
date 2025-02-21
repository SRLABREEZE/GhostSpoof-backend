require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 GhostSpoof Backend Running on Port ${PORT}`);
  app.get("/", (req, res) => {
  res.send("🔥 GhostSpoof Backend is Running!");
 
});
