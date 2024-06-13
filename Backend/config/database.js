// backend/config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
   process.env.DATABASE,
   process.env.DATABASE_USER,
   process.env.DATABASE_PASSWORD,
    {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql',
  logging: console.log, // Afficher les requêtes SQL exécutées
});

module.exports = sequelize;
