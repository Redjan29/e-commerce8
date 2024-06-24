// backend/models/role.js
// backend/models/role.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RoleUtilisateur = sequelize.define('RoleUtilisateur', {
  id_Role: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Client: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'RoleUtilisateur'
});

module.exports = RoleUtilisateur;
