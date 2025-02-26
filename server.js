const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());

// Routes
const userRoutes = require('./src/routes/userRoutes');
const callRoutes = require('./src/routes/callRoutes');

app.use('/api/users', userRoutes);
app.use('/api/calls', callRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
