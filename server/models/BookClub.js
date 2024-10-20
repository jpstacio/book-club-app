const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BookClub = sequelize.define('BookClub', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = BookClub;
