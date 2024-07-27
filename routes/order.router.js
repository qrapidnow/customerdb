const express = require('express');
const { saveOrder } = require('../controllers/order.controller');

const router = express.Router();

router.post('/', (req, res) => {
  console.log("Received POST request on /orders");
  saveOrder(req, res);
});

module.exports = router;
