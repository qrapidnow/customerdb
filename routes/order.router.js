const express = require('express');
const { saveOrder } = require('../controllers/order.controller');

const router = express.Router();

// POST endpoint for creating new orders
router.post('/', saveOrder);

module.exports = router;
