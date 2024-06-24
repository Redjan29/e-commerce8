// backend/routes/user.js
const express = require('express');
const { registerUser, validateRegister } = require('../controllers/userController'); 
const { loginUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth.js'); 
const csrf = require('csurf');
const router = express.Router();

// Configurer CSRF protection
const csrfProtection = csrf({ cookie: true });

// Appliquez le middleware csrfProtection et validateRegister avant registerUser
router.post('/register', csrfProtection, validateRegister, registerUser);
router.post('/login', csrfProtection, loginUser);

// Route protégée
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'This is the user profile', user: req.user });
});

module.exports = router;
