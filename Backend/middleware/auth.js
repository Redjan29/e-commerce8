// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token; // Récupérer le jeton depuis les cookies
  console.log('Token:', token); // Log du token reçu

  if (!token) {
    console.log('Access denied: No token provided'); // Log en cas d'absence de token
    return res.status(403).json({ message: 'Access denied' }); // Si pas de jeton, accès refusé
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifier et décoder le jeton
    console.log('Decoded token:', decoded); // Log pour voir le contenu du token décodé
    req.user = decoded;

    // Vérification du rôle d'admin pour les routes admin
    if (req.originalUrl.startsWith('/api/admin') && !decoded.isAdmin) {
      console.log('Unauthorized: Not an admin'); // Log si l'utilisateur n'est pas admin
      return res.status(401).json({ message: 'Unauthorized' }); // Bloquer l'accès si l'utilisateur n'est pas admin
    }

    next(); // Passer au middleware suivant si tout est OK
  } catch (error) {
    console.log('Invalid token:', error.message); // Log en cas de jeton invalide
    return res.status(401).json({ message: 'Invalid token' }); // Jeton invalide
  }
};

module.exports = authenticateJWT;


