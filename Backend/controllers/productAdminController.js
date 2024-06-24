//backend/controllers/productAdminCOntroller
const Product = require('../models/product');  

// Lire tous les produits
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// Créer un nouveau produit
exports.createProduct = async (req, res) => {
    try {
        const { Titre, Description, Image, Prix, old_price, Id_CategorieProduit, isNewCollection } = req.body;
        console.log('Creating product with data:', req.body); // Log des données du produit
        const product = await Product.create({
            Titre,
            Description,
            Image,
            Prix,
            old_price,
            Id_CategorieProduit,
            isNewCollection
        });
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(400).json({ message: error.message });
    }
};

// Modifier un produit existant
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { Titre, Description, Image, Prix, old_price, Id_CategorieProduit, isNewCollection } = req.body;
        console.log(`Updating product ID ${id} with data:`, req.body); // Log des données du produit à mettre à jour
        const updated = await Product.update({
            Titre,
            Description,
            Image,
            Prix,
            old_price,
            Id_CategorieProduit,
            isNewCollection
        }, {
            where: { Id_Produit: id }
        });
        if (updated) {
            const updatedProduct = await Product.findByPk(id);
            res.status(200).json(updatedProduct);
        } else {
            console.log('Product not found for update:', id); // Log si le produit n'est pas trouvé
            res.status(404).json({ message: 'Produit non trouvé' });
        }
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting product ID:', id); // Log de l'ID du produit à supprimer
        const deleted = await Product.destroy({
            where: { Id_Produit: id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Produit supprimé' });
        } else {
            console.log('Product not found for deletion:', id); // Log si le produit n'est pas trouvé
            res.status(404).json({ message: 'Produit non trouvé' });
        }
    } catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).json({ message: error.message });
    }
};
