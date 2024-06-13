// backend/routes/user.js
const express = require('express');
const { registerUser, validateRegister } = require('../controllers/userController'); // Importez également validateRegister
const { loginUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth.js'); 
const router = express.Router();

// Appliquez le middleware validateRegister avant registerUser
router.post('/register', validateRegister, registerUser);
router.post('/login', loginUser);

// Route protégée
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'This is the user profile', user: req.user });
});



module.exports = router;

