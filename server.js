const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const orderRoutes = require('./routes/order.router');  // Make sure the path is correct

const app = express();
const port = process.env.PORT || 5000;

// Initialize Firebase Admin with credentials
const serviceAccount = require('./service-account-key.json');  // Adjust path as needed

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://customerdb-70370.firebaseio.com"  // Your Firebase project's database URL
});

// CORS options to allow your specific frontend domains
const whitelist = ['https://customerdb-70370.web.app', 'https://digitalmenu-rouge.vercel.app'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());  // Parse JSON bodies

// Routing setup
app.use('/orders', orderRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
