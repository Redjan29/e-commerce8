// backend/controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ error: "You are not authenticated" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token not valid" });
      } else {
        try {
          const user = await User.findByPk(decoded.id);
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
          req.user = {
            nom: user.Nom,
            prenom: user.Prenom,
            email: user.Email
          };
          next();
        } catch (error) {
          return res.status(500).json({ error: "Server error" });
        }
      }
    });
  }
};

exports.verifyUser = verifyUser;

exports.loginUser = async (req, res) => {
  const { Email, Mot_de_passe } = req.body;
console.log(Email,Mot_de_passe);
  try {
    console.log('Login attempt with email:', Email);

    const user = await User.findOne({ where: { Email } });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user);
console.log(user.Mot_de_passe);
console.log(await bcrypt.hash(Mot_de_passe,10));

    const isMatch = await bcrypt.compare(Mot_de_passe, user.Mot_de_passe);
    console.log('Password match status:', isMatch);
    if (!isMatch) {
      console.log('Invalid credentials');
      return res.status(400).json({ message: 'Invalid credentials' });
    }console.log(isMatch)

    const token = jwt.sign({ id: user.id_Utilisateur, name: user.Nom }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    console.log('Login successful, token generated');
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: error.message });
  }
};
