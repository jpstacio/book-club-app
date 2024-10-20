const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
    type: DataTypes.TEXT, // Stores a comma-separated list or JSON string of favorite books
    allowNull: true,
  },
  biography: {
    type: DataTypes.TEXT, // Stores the user's bio
    allowNull: true,
  },
});

module.exports = User;
