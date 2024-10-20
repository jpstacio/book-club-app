const express = require('express');
const { register, login } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware'); // Import the middleware
const { User, Club } = require('../models'); // Import User and Club models
const router = express.Router();

// POST request for registering a user
router.post('/register', register);

// POST request for logging in a user
router.post('/login', login);

// GET request for fetching profile data (protected route)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Fetch user based on userId from the token
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch book clubs associated with the user
    const bookClubs = await Club.findAll({ where: { userId: user.id } });

    // Return user information and book clubs
    res.json({ user: { username: user.username }, bookClubs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching profile data' });
  }
});

module.exports = router;
