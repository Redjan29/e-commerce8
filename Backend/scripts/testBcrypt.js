const bcrypt = require('bcrypt');
const User = require('../models/user');
const sequelize = require('../config/database');

async function testBcrypt(email, plainPassword) {
  try {
    await sequelize.sync(); // S'assurer que la connexion à la base de données est établie

    const user = await User.findOne({ where: { Email: email } });
    if (!user) {
      console.log('User not found');
      return;
    }

    console.log('Stored hashed password:', user.Mot_de_passe);
    console.log('Provided password:', plainPassword);

    const isMatch = await bcrypt.compare(plainPassword, user.Mot_de_passe);
    console.log('Password match status:', isMatch);
  } catch (error) {
    console.error('Error during bcrypt test:', error.message);
  }
}

const email = 'm@gmail.com'; // Remplacez par l'email de l'utilisateur
const plainPassword = 'm'; // Remplacez par le mot de passe en clair

testBcrypt(email, plainPassword);
