//backend/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/user');
const protectedRoutes = require('./routes/protected');
const productRoutes = require('./routes/product');

const app = express();

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET"],
  credentials: true // Permettre l'inclusion des cookies
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/products', productRoutes);

// Configurer Express pour servir des fichiers statiques
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));

sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => console.log(err));

module.exports = app;
