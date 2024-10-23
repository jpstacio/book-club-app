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
        console.log('Fetching profile for userId:', req.user.userId);

        const user = await User.findByPk(req.user.userId, {
            attributes: ['username', 'favoriteBooks', 'biography'],
            include: [
                { 
                    association: 'friends', 
                    attributes: ['username'], 
                    through: { attributes: [] } 
                },
                { 
                    association: 'joinedBookClubs', 
                    attributes: ['id', 'name', 'description', 'currentBook', 'currentChapters', 'bookDescription'] 
                },
                { 
                    association: 'ownedBookClubs', 
                    attributes: ['id', 'name', 'description', 'currentBook', 'currentChapters', 'bookDescription'] 
                }
            ],
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('User profile data:', user);
        res.json({ user });
    } catch (err) {
        console.error('Error fetching profile:', err);
        res.status(500).json({ error: 'Error fetching profile data' });
    }
});

  
  
module.exports = router;
