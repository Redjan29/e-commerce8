// backend/scripts/resetPassword.js
const bcrypt = require('bcrypt');
const User = require('../models/user');
const sequelize = require('../config/database');

async function resetPassword(email, newPassword) {
  try {
    await sequelize.sync();

    const user = await User.findOne({ where: { Email: email } });
    if (!user) {
      console.log('User not found');
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.Mot_de_passe = hashedPassword;
    await user.save();
    console.log('Password reset successful');
  } catch (error) {
    console.error('Error resetting password:', error.message);
  }
}

const email = 'm@gmail.com';
const newPassword = 'new_password';

resetPassword(email, newPassword);
