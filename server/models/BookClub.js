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
  ownerId: { // This field should correspond to the User who owns the club
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User', // Ensure the model name is correct
      key: 'id',
    },
  },
});

module.exports = BookClub;
