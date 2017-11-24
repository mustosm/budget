// transaction.js
import mongoose from 'mongoose';
const TransactionSchema = new mongoose.Schema({  
  transactionId: String,
  amount: {
    value: Number,
    device: String
  },
  meansPayment: String,
  description: String,
  type: String,
  categoryId: String,
  creationDate: Date,
  updateDate: Date
});

mongoose.model('Transaction', TransactionSchema);
module.exports = mongoose.model('Transaction');