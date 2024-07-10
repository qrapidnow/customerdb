const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const orderRoute = require('./routes/order.router');

const app = express();
const port = process.env.PORT || 5000;

// Setup CORS explicitly
app.use(cors({
  origin: (origin, callback) => {
    const whitelist = ['https://frontend1-sand.vercel.app'];
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(bodyParser.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(orderRoute);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Log errors
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Server error occurred');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
