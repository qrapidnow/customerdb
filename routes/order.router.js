const express = require('express');
const { saveOrder } = require('../controllers/order.controller'); // Assuming this path

const router = express.Router();

// POST endpoint for creating a new order
router.post('/', saveOrder);

module.exports = router;
