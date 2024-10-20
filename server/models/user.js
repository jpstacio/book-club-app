const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const BookClub = require('./BookClub'); // Import the BookClub model

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  favoriteBooks: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  biography: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = User;
