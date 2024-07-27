const express = require('express');

function orderRoutes(db) {
  const router = express.Router();

  // Route to handle creating orders
  router.post('/', async (req, res) => {
    const { name, whatsapp, tableNo, items } = req.body;

    try {
      const orderRef = db.collection('orders').doc();
      await orderRef.set({
        name,
        whatsapp,
        tableNo,
        items,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      res.status(201).json({ id: orderRef.id, ...req.body });
    } catch (error) {
      console.error('Error saving order:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });

  return router;
}

module.exports = orderRoutes;
