const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const orderRoutes = require('./routes/order.router'); // Assuming this is the path to your order routes

const app = express();
const port = process.env.PORT || 5000;

// Initialize Firebase Admin with your service account
const serviceAccount = require('./service-account-file.json'); // Update the path to your service account JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Configure CORS to allow requests from your frontend domains
const whitelist = ['https://customerdb-70370.web.app', 'https://digitalmenu-rouge.vercel.app'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes
app.use('/api/orders', orderRoutes); // Mount the order routes at /api/orders

app.get('/', (req, res) => {
  res.send('Hello from Firebase Hosting!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).send({ message: 'Internal Server Error', error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
