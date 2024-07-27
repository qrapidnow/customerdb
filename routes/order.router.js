const express = require('express');
const { saveOrder } = require('../controllers/order.controller');

const router = express.Router();

router.post('/', saveOrder);

module.exports = router;
