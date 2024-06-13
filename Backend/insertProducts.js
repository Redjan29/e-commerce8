// backend/insertProducts.js
const path = require('path');
const sequelize = require('./config/database');
const Product = require('./models/product');

// Chemin absolu vers le fichier all_product.js
const all_product = require(path.join(__dirname, '../frontend/src/Components/Assets/all_product'));

const insertProducts = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Synchroniser le modèle Product avec la base de données
    await Product.sync({ force: true }); // Utiliser { force: true } pour recréer la table à chaque exécution (attention aux données existantes)

    // Préparer les produits pour l'insertion
    const productsToInsert = all_product.map(product => ({
      Titre: product.name,
      Description: '', // Ajoutez une description si nécessaire
      Image: product.image, // Chemin relatif de l'image
      Prix: product.new_price,
      Id_CategorieProduit: product.category,
    }));

    // Insérer les produits dans la base de données
    await Product.bulkCreate(productsToInsert);
    console.log('Products have been inserted successfully.');

    // Fermer la connexion à la base de données
    await sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

insertProducts();
