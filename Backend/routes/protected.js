// backend/routes/protectedRoute.js

const express = require('express');
const router = express.Router();
const { verifyUser } = require('../controllers/authController');

// Exemple de route protégée
router.get('/dashboard', verifyUser, (req, res) => {
  res.json({ status: 'success', name: req.name });
});

// Route pour la déconnexion
router.get('/logout', (req, res) => {
  res.clearCookie('token'); // Suppression du cookie
  res.json({ message: 'Logout successful' });
});


// Route protégée pour récupérer les informations de l'utilisateur
router.get('/profile', verifyUser, (req, res) => {
  // Supposons que vous ayez les informations de l'utilisateur dans req.user
  const user = {
    nom: req.user.nom,
    prenom: req.user.prenom,
    email: req.user.email
  };
  res.json(user);
});

module.exports = router;
