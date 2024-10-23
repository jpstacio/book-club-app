const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '/home/patrick/Documents/book-club-app/server',
  logging: false, // Set to true if you want to see SQL queries in the console
});

module.exports = sequelize;
