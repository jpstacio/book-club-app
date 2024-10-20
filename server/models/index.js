const User = require('./user');
const BookClub = require('./BookClub');

// Define Many-to-Many relationship between Users and BookClubs
User.belongsToMany(BookClub, { through: 'UserBookClubs' });
BookClub.belongsToMany(User, { through: 'UserBookClubs' });

// One-to-Many relationship between Users and the BookClubs they own
User.hasMany(BookClub, { foreignKey: 'ownerId', as: 'ownedClubs' });
BookClub.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

module.exports = { User, BookClub };
