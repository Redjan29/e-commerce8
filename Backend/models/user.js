// backend/models/user.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Utilisateur = sequelize.define('Utilisateur', {
  id_Utilisateur: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Mot_de_passe: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'utilisateur', // Nom explicite de la table
});

module.exports = Utilisateur;
