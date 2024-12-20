const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const BookClub = require('./BookClub');

// Define the UserBookClub model
const UserBookClub = sequelize.define('UserBookClub', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  bookClubId: {
    type: DataTypes.INTEGER,
    references: {
      model: BookClub,
      key: 'id',
    },
  },
});

module.exports = UserBookClub;
