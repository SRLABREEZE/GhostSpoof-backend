const express = require('express');
const { addReferral } = require('../controllers/userController');

const router = express.Router();

router.post('/referral', addReferral);

module.exports = router;
