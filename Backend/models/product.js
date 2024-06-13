// backend/controllers/authController.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  Id_Produit: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Prix: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  old_price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Id_CategorieProduit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isNewCollection: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'produit',
  timestamps: false, // Ajoutez cette ligne si vous n'utilisez pas createdAt et updatedAt
});

module.exports = Product;
