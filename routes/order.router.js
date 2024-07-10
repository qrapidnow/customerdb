const express = require('express');
const { saveOrder } = require('../controllers/order.controller');
const router = express.Router();

// Route to save order
router.post('/orders', saveOrder);

module.exports = router;
