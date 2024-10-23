const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { BookClub, User, UserBookClub } = require('../models');
const { Op } = require('sequelize');


const router = express.Router(); 

// Route to create a new book club
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { name, description, currentBook, currentChapters, bookDescription } = req.body;
        const userId = req.user.userId;

        const newClub = await BookClub.create({
            name,
            description,
            ownerId: userId,
            currentBook,
            currentChapters,
            bookDescription,
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
        await user.addJoinedBookClub(bookClub); 

        res.status(200).json({ message: 'Successfully joined the book club' });
    } catch (err) {
        console.error('Error joining book club:', err);
        res.status(500).json({ error: 'Error joining book club' });
    }
});

// Route to get all book clubs for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        // Fetch clubs where the user is either the owner or a member
        const bookClubs = await BookClub.findAll({
            where: {
                [Op.or]: [
                    { ownerId: userId }, // User owns the club
                    {
                        '$members.id$': userId // User is a member of the club
                    }
                ]
            },
            include: [
                {
                    model: User,
                    as: 'members',
                    attributes: [] 
                }
            ],
            attributes: ['id', 'name', 'description', 'currentBook', 'currentChapters', 'bookDescription', 'ownerId'],
        });

        res.status(200).json(bookClubs);
    } catch (err) {
        console.error('Error fetching book clubs:', err);
        res.status(500).json({ error: 'Error fetching book clubs' });
    }
});

// Route to get all book clubs the user has NOT joined
router.get('/available', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        // Find IDs of all book clubs the user has joined
        const joinedClubs = await UserBookClub.findAll({
            where: { userId },
            attributes: ['bookClubId'],
        });

        const joinedClubIds = joinedClubs.map((club) => club.bookClubId);

        // Find all clubs that the user is not a member of
        const availableClubs = await BookClub.findAll({
            where: {
                id: { [Op.notIn]: joinedClubIds },
                ownerId: { [Op.ne]: userId }, // Exclude clubs owned by the user
            },
            attributes: ['id', 'name', 'description', 'currentBook', 'currentChapters', 'bookDescription', 'ownerId'],
        });

        res.status(200).json(availableClubs);
    } catch (err) {
        console.error('Error fetching available book clubs:', err);
        res.status(500).json({ error: 'Error fetching available book clubs' });
    }
});

// Route to get details of a specific book club
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const bookClubId = req.params.id;

        const bookClub = await BookClub.findByPk(bookClubId, {
            attributes: ['id', 'name', 'description', 'currentBook', 'currentChapters', 'bookDescription', 'ownerId'],
        });
        if (!bookClub) {
            return res.status(404).json({ error: 'Book club not found' });
        }

        res.status(200).json(bookClub);
    } catch (err) {
        console.error('Error fetching book club:', err);
        res.status(500).json({ error: 'Error fetching book club' });
    }
});

// Route to update book club details
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const bookClubId = req.params.id;
        const { currentBook, currentChapters, bookDescription } = req.body;

        const bookClub = await BookClub.findByPk(bookClubId);
        if (!bookClub) {
            return res.status(404).json({ error: 'Book club not found' });
        }

        // Ensure only the owner can update the book club details
        if (bookClub.ownerId !== req.user.userId) {
            return res.status(403).json({ error: 'You are not authorized to update this book club' });
        }

        // Update the fields
        bookClub.currentBook = currentBook || bookClub.currentBook;
        bookClub.currentChapters = currentChapters || bookClub.currentChapters;
        bookClub.bookDescription = bookDescription || bookClub.bookDescription;

        await bookClub.save();

        res.status(200).json({ message: 'Book club updated successfully', bookClub });
    } catch (err) {
        console.error('Error updating book club:', err);
        res.status(500).json({ error: 'Error updating book club' });
    }
});

module.exports = router;
