const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const BookClub = require('./BookClub');

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

// Export the model
module.exports = UserBookClub;
