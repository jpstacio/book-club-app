const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { User, Friendship } = require('../models');

const router = express.Router();

// Route to add a friend by username
router.post('/add', authenticateToken, async (req, res) => {
  const { username } = req.body;
  const userId = req.user.userId;

  try {
    const friend = await User.findOne({ where: { username } });
    if (!friend) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingFriendship = await Friendship.findOne({
      where: {
        userId: userId,
        friendId: friend.id,
      },
    });

    if (existingFriendship) {
      return res.status(400).json({ error: 'You are already friends with this user' });
    }

    await Friendship.create({ userId: userId, friendId: friend.id });
    res.status(201).json({ message: 'Friend added successfully' });
  } catch (err) {
    console.error('Error adding friend:', err);
    res.status(500).json({ error: 'Error adding friend' });
  }
});

// Export the router
module.exports = router;
