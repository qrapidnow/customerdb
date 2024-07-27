const express = require('express');
const { saveOrder } = require('../controllers/order.controller'); // Correct path to your controller

const router = express.Router();

// POST endpoint to create a new order
router.post('/', saveOrder);

module.exports = router;
