// backend/models/categorieProduit.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CategorieProduit = sequelize.define('CategorieProduit', {
  Id_CategorieProduit: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  NomCategorie: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'categorieproduit',
  timestamps: false, // Ajoutez cette ligne si vous n'utilisez pas createdAt et updatedAt
});

module.exports = CategorieProduit;
