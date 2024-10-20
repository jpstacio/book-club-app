const User = require('./User');
const BookClub = require('./BookClub');
const UserBookClub = require('./UserBookClub');

// Define associations
User.belongsToMany(BookClub, {
  through: UserBookClub,
  as: 'joinedBookClubs',
  foreignKey: 'userId',
});

BookClub.belongsToMany(User, {
  through: UserBookClub,
  as: 'members',
  foreignKey: 'bookClubId',
});

// Export all models
module.exports = {
  User,
  BookClub,
  UserBookClub,
};
