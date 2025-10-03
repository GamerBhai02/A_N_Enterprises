const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  leadId: {
    type: String,
    required: true
  },
  productRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    default: null
  },
  quote: {
    amount: { type: Number },
    breakdown: [{
      item: { type: String },
      cost: { type: Number }
    }]
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'partial'],
    default: 'pending'
  },
  deliveryStatus: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);