// models/BookClub.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Your sequelize configuration

const BookClub = sequelize.define('BookClub', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = BookClub;
