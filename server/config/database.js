const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '/Users/jayanaestacio/Documents/book-club-app/server/database.sqlite',
  logging: false, // Set to true if you want to see SQL queries in the console
});

module.exports = sequelize;
