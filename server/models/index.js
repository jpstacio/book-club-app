const User = require('./User');
const BookClub = require('./BookClub');
const UserBookClub = require('./UserBookClub');
const Friendship = require('./Friendship');

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

// Correctly define ownedBookClubs association here as well
User.hasMany(BookClub, {
  as: 'ownedBookClubs',
  foreignKey: 'ownerId',
});

User.belongsToMany(User, {
  through: Friendship,
  as: 'friends',
  foreignKey: 'userId',
  otherKey: 'friendId',
});

// Export all models
module.exports = {
  User,
  BookClub,
  UserBookClub,
  Friendship,
};
