import express from 'express';
import Payment from '../db/PaymentSchema.js';

const router = express.Router();

router.post('/PaymentDetails', async (req, res) => {
  try {
    console.log('Received payment data:', req.body);
    const { email, transactionTime, transactionId } = req.body;
    
    const payment = new Payment({
      email,
      transactionTime,
      transactionId
    });
    
    const savedPayment = await payment.save();
    console.log('Payment saved:', savedPayment);
    res.status(201).json(savedPayment);
  } catch (error) {
    console.error('Error saving payment:', error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/PaymentDetails', async (req, res) => {
  try {
    console.log('Fetching all payments');
    const payments = await Payment.find().sort({ timestamp: -1 });
    console.log('Found payments:', payments);
    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;