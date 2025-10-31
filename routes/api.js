const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Create demo users
router.post('/create-users', async (req, res) => {
  try {
    const usersData = [
      { name: "Alice", balance: 1000 },
      { name: "Bob", balance: 500 }
    ];
    await User.deleteMany({});
    const users = await User.insertMany(usersData);
    res.status(201).json({
      message: "Users created",
      users
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Transfer endpoint
router.post('/transfer', async (req, res) => {
  try {
    const { fromUserId, toUserId, amount } = req.body;
    if (!fromUserId || !toUserId || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }
    const sender = await User.findById(fromUserId);
    const receiver = await User.findById(toUserId);
    if (!sender || !receiver) {
      return res.status(404).json({ message: "User not found" });
    }
    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
    sender.balance -= amount;
    receiver.balance += amount;
    await sender.save();
    await receiver.save();
    res.status(200).json({
      message: `Transferred $${amount} from ${sender.name} to ${receiver.name}.`,
      senderBalance: sender.balance,
      receiverBalance: receiver.balance
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
