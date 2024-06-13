// backend/controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { check, validationResult } = require('express-validator');

// Fonction de middleware pour la validation
exports.validateRegister = [
  check('Nom')
    .not().isEmpty().withMessage('Name is required')
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/).withMessage('Name must contain only letters'),
  check('Prenom')
    .not().isEmpty().withMessage('First name is required')
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/).withMessage('First name must contain only letters'),
  check('Email')
    .isEmail().withMessage('A valid email address is required'),
  check('Mot_de_passe')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/\d/).withMessage('Password must contain a digit')
];

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { Nom, Prenom, Email, Mot_de_passe } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Mot_de_passe, salt);
    const newUser = await User.create({ Nom, Prenom, Email, Mot_de_passe: hashedPassword });
    console.log('User registered:', newUser);
    res.status(201).json({
      message: 'User registered successfully',
      user: newUser
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(400).json({ message: error.message });
  }
};

