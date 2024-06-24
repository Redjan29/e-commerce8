const sequelize = require('./config/database');
const { RoleUtilisateur } = require('./models/relation');

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synchronized');
    return RoleUtilisateur.bulkCreate([
      { Admin: true, Client: false },
      { Admin: false, Client: true }
    ], { ignoreDuplicates: true });
  })
  .then(() => {
    console.log('Roles inserted');
  })
  .catch(err => {
    console.error('Failed to initialize roles:', err);
  });
