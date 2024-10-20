const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { Club, User } = require('../models');
const router = express.Router();

// Create a new book club
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.userId;

    const newClub = await Club.create({
      name,
      description,
      userId,
    });

    res.status(201).json(newClub);
  } catch (err) {
    console.error('Error creating book club:', err);
    res.status(500).json({ error: 'Error creating book club' });
  }
});

module.exports = router;
