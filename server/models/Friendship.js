const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Friendship = sequelize.define('Friendship', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  friendId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});

module.exports = Friendship;
