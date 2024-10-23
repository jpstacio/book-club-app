const User = require('./User');
const Friendship = require('./Friendship');
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

// Define ownedBookClubs association
User.hasMany(BookClub, {
  as: 'ownedBookClubs',
  foreignKey: 'ownerId',
});

// Define friendships associations if applicable
User.belongsToMany(User, {
  through: 'Friendships',
  as: 'friends',
  foreignKey: 'userId',
  otherKey: 'friendId',
});

module.exports = {
  User,
  BookClub,
  UserBookClub,
  Friendship,
};
