const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the BookClub model
const BookClub = sequelize.define('BookClub', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  currentBook: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  currentChapters: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bookDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
});

module.exports = BookClub;
