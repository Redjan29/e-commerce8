const bcrypt = require('bcrypt');

// Mot de passe en clair que vous voulez tester
const plainPassword = 'm';

async function testBcrypt() {
  try {
    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log('Mot de passe haché:', hashedPassword);

    // Comparaison du mot de passe en clair avec le mot de passe haché
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('Comparaison bcrypt test:', match);
  } catch (error) {
    console.error('Erreur de comparaison bcrypt:', error.message);
  }
}

testBcrypt();
