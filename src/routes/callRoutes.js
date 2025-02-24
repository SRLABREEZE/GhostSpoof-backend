const express = require('express');
const { makeCall } = require('../controllers/callController');

const router = express.Router();

router.post('/make-call', makeCall);

module.exports = router;
