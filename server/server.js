const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const orderRoutes = require('./routes/order.routes');

const app = express();
const port = process.env.PORT || 5000;

const serviceAccount = require('./service-account-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(cors({
  origin: ['https://digitalmenu-rouge.vercel.app', 'https://customerdb-70370.web.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
