const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
const port = process.env.PORT || 5000;

// Initialize Firebase Admin SDK with credentials
const serviceAccount = require('./service-account-key.json'); // Path to your Firebase service account file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://customerdb-70370.firebaseio.com" // Ensure this is correct
});

// CORS setup to allow your frontend domains
app.use(cors({
  origin: ['https://digitalmenu-rouge.vercel.app', 'https://customerdb-70370.web.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Parse JSON bodies

// Order route handling
app.post('/orders', async (req, res) => {
  const { name, whatsapp, tableNo, items } = req.body;
  console.log("Received order with data:", req.body); // Log received data

  const db = admin.firestore();
  const ordersRef = db.collection('orders');

  try {
    const docRef = await ordersRef.add({
      name,
      whatsapp,
      tableNo,
      items,
      createdAt: admin.firestore.FieldValue.serverTimestamp() // Use server timestamp for consistency
    });
    console.log("Order saved successfully with ID:", docRef.id); // Confirm save operation
    res.status(201).json({ message: 'Order placed successfully', orderId: docRef.id });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Failed to save order', error: error.toString() });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
