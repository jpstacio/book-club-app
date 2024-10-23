const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const bookClubRoutes = require('./routes/bookClubRoutes');
const sequelize = require('./config/database');
const friendshipRoutes = require('./routes/friendshipRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/book-clubs', bookClubRoutes);
app.use('/api/friends', friendshipRoutes);

const PORT = process.env.PORT || 5000;

// Function to sync the database with error handling
const syncDatabase = async () => {
    try {
      await sequelize.sync({ force: true }); // Sync all models based on their associations
      console.log('Database synced and updated!');
      app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    } catch (err) {
      console.error('Error syncing database:', err);
    }
  };
  

// Call the syncDatabase function to start the server
syncDatabase();
