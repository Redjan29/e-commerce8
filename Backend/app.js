// backend/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const sequelize = require('./config/database');

const userRoutes = require('./routes/user');
const protectedRoutes = require('./routes/protected');
const productRoutes = require('./routes/product');
const adminRoutes = require('./routes/admin');

const { Utilisateur, RoleUtilisateur } = require('./models/relation');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(csurf({ cookie: true }));

app.use((req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});

app.use('/api/users', userRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));

sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => console.log(err));

app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).send('Invalid CSRF token');
  } else {
    next(err);
  }
});

module.exports = app;
