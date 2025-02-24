const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');
const { rewardReferral } = require('../controllers/referralController');

// User registration with 5 free minutes
router.post('/register', registerUser);

// Handle referrals (reward system)
router.post('/referral', rewardReferral);

module.exports = router;
