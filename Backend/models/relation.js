// backend/models/relation.js
const Utilisateur = require('./user');
const RoleUtilisateur = require('./role');

// Définir la relation plusieurs à plusieurs avec une table d'association personnalisée
Utilisateur.belongsToMany(RoleUtilisateur, { through: 'Detient', foreignKey: 'id_Utilisateur' });
RoleUtilisateur.belongsToMany(Utilisateur, { through: 'Detient', foreignKey: 'id_Role' });

module.exports = {
  Utilisateur,
  RoleUtilisateur
};
