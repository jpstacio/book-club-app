const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Make sure this path is correct
const bookClubRoutes = require('./routes/bookClubRoutes');
const sequelize = require('./config/database');  
const { User, BookClub } = require('./models');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json()); // Ensure JSON body parsing is enabled

// Make sure the base path is correctly set to match your requests
app.use('/api/auth', authRoutes);
app.use('/api/book-clubs', bookClubRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


sequelize.sync({ force: false }) // Use `force: true` only if you want to drop and recreate tables
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });