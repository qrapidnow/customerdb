const admin = require('firebase-admin');

const saveOrder = async (req, res) => {
  const { name, whatsapp, tableNo, items } = req.body;
  const db = admin.firestore();
  const ordersRef = db.collection('orders');

  try {
    const docRef = await ordersRef.add({
      name,
      whatsapp,
      tableNo,
      items,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.status(201).json({ message: 'Order placed successfully', orderId: docRef.id });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Failed to save order', error: error.toString() });
  }
};

module.exports = { saveOrder };
