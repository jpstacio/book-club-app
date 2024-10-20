const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { BookClub, User } = require('../models');
const router = express.Router();

// Route to create a new book club
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.userId;

    const newClub = await BookClub.create({
      name,
      description,
      ownerId: userId,
    });

    res.status(201).json(newClub);
  } catch (err) {
    console.error('Error creating book club:', err);
    res.status(500).json({ error: 'Error creating book club' });
  }
});

// Route to join a book club
router.post('/:id/join', authenticateToken, async (req, res) => {
  try {
    const clubId = req.params.id;
    const userId = req.user.userId;

    const bookClub = await BookClub.findByPk(clubId);
    if (!bookClub) {
      return res.status(404).json({ error: 'Book club not found' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await bookClub.addUser(user);
    res.status(200).json({ message: 'Successfully joined the book club' });
  } catch (err) {
    console.error('Error joining book club:', err);
    res.status(500).json({ error: 'Error joining book club' });
  }
});

// Route to get all book clubs
router.get('/', authenticateToken, async (req, res) => {
  try {
    const bookClubs = await BookClub.findAll();
    res.status(200).json(bookClubs);
  } catch (err) {
    console.error('Error fetching book clubs:', err);
    res.status(500).json({ error: 'Error fetching book clubs' });
  }
});

module.exports = router;
