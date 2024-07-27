const admin = require('firebase-admin');

const saveOrder = async (req, res) => {
  const { name, whatsapp, tableNo, items } = req.body;

  try {
    const orderRef = admin.firestore().collection('orders').doc();
    await orderRef.set({
      name,
      whatsapp,
      tableNo,
      items,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.status(201).json({ message: 'Order saved successfully', id: orderRef.id });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Failed to save order', error: error.message });
  }
};

module.exports = { saveOrder };
