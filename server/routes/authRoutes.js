const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware'); // Ensure this is imported correctly
const { register, login } = require('../controllers/authController');
const { User } = require('../models'); // Import your User model

const router = express.Router();

// Protected route for fetching profile data
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Fetch the user using the decoded userId from the token
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with user data
    res.json({ user: { username: user.username } });
  } catch (err) {
    console.error('Error fetching profile data:', err);
    res.status(500).json({ error: 'Error fetching profile data' });
  }
  console.log('Decoded userId from token:', req.user.userId);
});

// Route for registering a user
router.post('/register', register);

// Route for logging in a user
router.post('/login', login);

module.exports = router;

