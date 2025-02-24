require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('./src/config/db');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/user', require('./src/routes/userRoutes'));
app.use('/api/calls', require('./src/routes/callRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
