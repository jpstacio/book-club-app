const express = require('express');
const { register, login } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { User } = require('../models');
const router = express.Router();

// Route to register a new user
router.post('/register', register);

// Route to log in an existing user
router.post('/login', login);

// Protected route to get the user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: ['username', 'favoriteBooks', 'biography'],
      include: [
        { association: 'friends', attributes: ['username'], through: { attributes: [] } },
        { association: 'joinedBookClubs', attributes: ['name'] },
        { association: 'ownedBookClubs', attributes: ['name'] }
      ],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Error fetching profile data' });
  }
});

module.exports = router;
