const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const bookClubRoutes = require('./routes/bookClubRoutes');
const sequelize = require('./config/database');
const { User, BookClub } = require('./models'); // Import models via index.js
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/book-clubs', bookClubRoutes);

const PORT = process.env.PORT || 5000;

// Function to sync the database with error handling
const syncDatabase = async () => {
  try {
    // Sync the database and make sure any necessary changes are applied
    await sequelize.sync({ force: true });
    console.log('Database synced and updated!');

    // Start the server after the database sync is successful
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Error syncing database:', err);
  }
};

// Call the syncDatabase function to start the server
syncDatabase();
