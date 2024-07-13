const mongoose = require('mongoose');
const moment = require('moment-timezone');
const Schema = mongoose.Schema;

// Define the Order schema
const OrderSchema = new Schema({
  name: { type: String, required: true },
  whatsapp: { type: String, required: true },
  tableNo: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

// Pre-save hook to set createdAt in IST
OrderSchema.pre('save', function(next) {
  this.createdAt = moment.tz(Date.now(), 'Asia/Kolkata').toDate();
  next();
});

module.exports = mongoose.model('Order', OrderSchema);
