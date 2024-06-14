const Product = require('../models/product');  // Assurez-vous que le chemin d'accès est correct

// Lire tous les produits
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer un nouveau produit
exports.createProduct = async (req, res) => {
    try {
        const { Titre, Description, Image, Prix, old_price, Id_CategorieProduit, isNewCollection } = req.body;
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
        res.status(400).json({ message: error.message });
    }
};

// Modifier un produit existant
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { Titre, Description, Image, Prix, old_price, Id_CategorieProduit, isNewCollection } = req.body;
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
            res.status(404).json({ message: 'Produit non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.destroy({
            where: { Id_Produit: id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Produit supprimé' });
        } else {
            res.status(404).json({ message: 'Produit non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
