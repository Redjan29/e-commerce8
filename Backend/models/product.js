// backend/models/product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CategorieProduit = require('./categorieProduit'); // Importez le modèle CategorieProduit

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
    references: {
      model: CategorieProduit, // Le modèle de référence
      key: 'Id_CategorieProduit', // La clé primaire du modèle de référence
    },
  },
  isNewCollection: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'produit',
  timestamps: false,
});

// Définir la relation
Product.belongsTo(CategorieProduit, { foreignKey: 'Id_CategorieProduit' });
CategorieProduit.hasMany(Product, { foreignKey: 'Id_CategorieProduit' });

module.exports = Product;
