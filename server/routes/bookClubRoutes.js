const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { BookClub, User, UserBookClub } = require('../models');

const router = express.Router(); // Define the router here

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
      const bookClubId = req.params.id;
      const userId = req.user.userId;
  
      // Find the book club the user wants to join
      const bookClub = await BookClub.findByPk(bookClubId);
      if (!bookClub) {
        return res.status(404).json({ error: 'Book club not found' });
      }
  
      // Find the user who wants to join the book club
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the user is already a member of the book club
      const existingMembership = await UserBookClub.findOne({
        where: { userId, bookClubId },
      });
      if (existingMembership) {
        return res.status(400).json({ error: 'You are already a member of this book club' });
      }
  
      // Add the user to the book club using the correct method
      await user.addJoinedBookClub(bookClub); // Ensure this matches the alias in the association
  
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