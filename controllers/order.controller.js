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
    res.status(201).json({ id: orderRef.id, message: 'Order saved successfully!' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Failed to save order', error: error.message });
  }
};

module.exports = { saveOrder };
