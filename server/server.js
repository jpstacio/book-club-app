const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Make sure this path is correct
const bookClubRoutes = require('./routes/bookClubRoutes');
const sequelize = require('./config/database');  
const { User, BookClub } = require('./models');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json()); // Ensures JSON body parsing is enabled

// Register the routes
app.use('/api/auth', authRoutes);
app.use('/api/book-clubs', bookClubRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Sync the database
sequelize.sync({ alter: true }) // Use `alter: true` to update the table structure without dropping data
  .then(() => {
    console.log('Database & tables updated!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
