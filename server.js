const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
const port = process.env.PORT || 5000;

console.log("Initializing Firebase Admin SDK...");

// Initialize Firebase Admin SDK with credentials
const serviceAccount = require('./service-account-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://customerdb-70370.firebaseio.com"
});

console.log("Setting up CORS...");

// Define CORS options
const corsOptions = {
  origin: function (origin, callback) {
    console.log(`Origin of request ${origin}`);
    const whitelist = ['https://digitalmenu-rouge.vercel.app', 'https://customerdb-70370.web.app'];
    if (!origin || whitelist.indexOf(origin) !== -1) {
      console.log("Allowed CORS for:", origin);
      callback(null, true);
    } else {
      console.log("Blocked CORS for:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());  // Middleware for parsing JSON bodies

console.log("Setting up routes...");

// Importing the order router
const orderRoutes = require('./routes/order.router');
app.use('/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Basic route for health check
app.get('/', (req, res) => {
  console.log("Received request on /");
  res.send('Server is running!');
});
