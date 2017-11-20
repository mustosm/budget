// transaction.js
import Mongoose from 'mongoose';
const TransactionSchema = new mongoose.Schema({  
  transactionId: String,
  amount: {
    value: number,
    device: String
  },
  paymentMeans: String,
  description: String,
  categoryId: String,
  creationDate: Date,
  updateDate: Date
});

mongoose.model('Transaction', TransactionSchema);
module.exports = mongoose.model('Transaction');