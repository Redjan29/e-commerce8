// backend/controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { check, validationResult } = require('express-validator');

// Fonction de middleware pour la validation des données d'inscription
exports.validateRegister = [
  check('Nom')
    .not().isEmpty().withMessage('Name is required') // Vérifie que le nom n'est pas vide
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/).withMessage('Name must contain only letters'), // Vérifie que le nom contient uniquement des lettres
  check('Prenom')
    .not().isEmpty().withMessage('First name is required') // Vérifie que le prénom n'est pas vide
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/).withMessage('First name must contain only letters'), // Vérifie que le prénom contient uniquement des lettres
  check('Email')
    .isEmail().withMessage('A valid email address is required'), // Vérifie que l'email est valide
  check('Mot_de_passe')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long') // Vérifie que le mot de passe fait au moins 8 caractères
    .matches(/\d/).withMessage('Password must contain a digit') // Vérifie que le mot de passe contient au moins un chiffre
];

// Fonction pour gérer l'inscription de l'utilisateur
exports.registerUser = async (req, res) => {
  const errors = validationResult(req); // Récupère les erreurs de validation
  if (!errors.isEmpty()) {
    console.error('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() }); // Renvoie les erreurs si validation échoue
  }

  const { Nom, Prenom, Email, Mot_de_passe } = req.body;
  try {
    const salt = await bcrypt.genSalt(10); // Génère un sel pour le hachage
    const hashedPassword = await bcrypt.hash(Mot_de_passe, salt); // Hash le mot de passe
    const newUser = await User.create({ Nom, Prenom, Email, Mot_de_passe: hashedPassword }); // Crée un nouvel utilisateur
    console.log('User registered:', newUser);
    res.cookie('XSRF-TOKEN', req.csrfToken()); // Ajouter le token CSRF aux cookies
    res.status(201).json({
      message: 'User registered successfully',
      user: newUser
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(400).json({ message: error.message }); // En cas d'erreur serveur
  }
};
