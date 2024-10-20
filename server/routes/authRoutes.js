const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { register, login } = require('../controllers/authController');
const { User } = require('../models');

const router = express.Router();

// Protected route for fetching profile data
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        username: user.username,
        favoriteBooks: user.favoriteBooks || '',
        biography: user.biography || '',
      },
    });
  } catch (err) {
    console.error('Error fetching profile data:', err);
    res.status(500).json({ error: 'Error fetching profile data' });
  }
});

// Protected route for updating profile data
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { favoriteBooks, biography } = req.body;
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.favoriteBooks = favoriteBooks;
    user.biography = biography;
    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ error: 'Error updating profile' });
  }
});

// Route for registering a user
router.post('/register', register);

// Route for logging in a user
router.post('/login', login);

module.exports = router;
