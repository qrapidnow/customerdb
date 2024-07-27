const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const orderRoutes = require('./routes/order.router');  // Ensure this path is correct

const app = express();
const port = process.env.PORT || 5000;

// Initialize Firebase Admin SDK with credentials
const serviceAccount = require('./service-account-key.json');  // Ensure this path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://customerdb-70370.firebaseio.com"  // Your Firebase project's database URL
});

// Define CORS options
const whitelist = ['https://digitalmenu-rouge.vercel.app', 'https://customerdb-70370.web.app'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};

app.use(cors(corsOptions));
app.use(express.json());  // Middleware for parsing JSON bodies

// Setup route handlers
app.use('/orders', orderRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
