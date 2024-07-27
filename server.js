const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const orderRoutes = require('./routes/order.router');

const app = express();
const port = process.env.PORT || 5000;

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const whitelist = ['https://customerdb-70370.web.app', 'https://digitalmenu-rouge.vercel.app'];
app.use(cors({
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use('/api/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
