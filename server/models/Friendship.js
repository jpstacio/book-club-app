const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Friendship model
const Friendship = sequelize.define('Friendship', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    primaryKey: true,
  },
  friendId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    primaryKey: true,
  },
});

module.exports = Friendship;

