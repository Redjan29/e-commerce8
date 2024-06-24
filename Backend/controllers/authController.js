// backend/controllers/authController.js
// backend/controllers/authController.js
const User = require('../models/user');
const RoleUtilisateur = require('../models/role'); // Assurez-vous d'importer le modèle RoleUtilisateur
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware pour vérifier l'authentification de l'utilisateur
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log('Vérification de l\'utilisateur - Token:', token);

  if (!token) {
    console.log('Aucun token trouvé, utilisateur non authentifié');
    return res.status(403).json({ error: "You are not authenticated" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log('Token invalide:', err.message);
        return res.status(401).json({ error: "Token not valid" });
      } else {
        try {
          console.log('Token décodé avec succès:', decoded);
          const user = await User.findByPk(decoded.id, {
            include: [{ model: RoleUtilisateur }]
          });

          if (!user) {
            console.log('Utilisateur non trouvé avec ID:', decoded.id);
            return res.status(404).json({ error: "User not found" });
          }
          console.log('Utilisateur trouvé:', user);

          req.user = {
            nom: user.Nom,
            prenom: user.Prenom,
            email: user.Email,
            isAdmin: user.RoleUtilisateurs.some(role => role.Admin)
          };
          next();
        } catch (error) {
          console.error('Erreur lors de la recherche de l\'utilisateur:', error.message);
          return res.status(500).json({ error: "Server error" });
        }
      }
    });
  }
};

exports.verifyUser = verifyUser;

exports.loginUser = async (req, res) => {
  const { Email, Mot_de_passe } = req.body;
  const csrfToken = req.headers['csrf-token'];
  console.log(`Tentative de connexion avec Email: ${Email}, Mot_de_passe: ${Mot_de_passe}`);
  console.log(`CSRF Token reçu: ${csrfToken}`);

  try {
    const user = await User.findOne({
      where: { Email },
      include: [{ model: RoleUtilisateur }]
    });

    if (!user) {
      console.log('Utilisateur non trouvé');
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(Mot_de_passe, user.Mot_de_passe);
    if (!isMatch) {
      console.log('Identifiants invalides');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isAdmin = user.RoleUtilisateurs.some(role => role.Admin);
    const token = jwt.sign({ id: user.id_Utilisateur, isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    const newCsrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', newCsrfToken);
    console.log('Login successful, token generated:', token); // Log du succès de connexion et du token généré
    res.status(200).json({ message: 'Login successful', isAdmin });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: error.message });
  }
};
