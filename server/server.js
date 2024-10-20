const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Make sure this path is correct
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json()); // Ensure JSON body parsing is enabled

// Make sure the base path is correctly set to match your requests
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
