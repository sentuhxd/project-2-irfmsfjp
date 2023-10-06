const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers/api/');
const helpers = require('./utils/helpers');
const productRoutes = require('./controllers/productRoutes');
const sequelize = require('./config/connection');
const cartRoutes = require('./controllers/cartRoute');
const cloudinary = require('cloudinary').v2;
const Product = require('./models/Product');
const fileUpload = require('express-fileupload');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const passport = require('./config/passport-config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const homeRoutes = require('./controllers/homeRoutes');

cloudinary.config({
  cloud_name: 'dk1drdjy9', 
  api_key: '168191626364913', 
  api_secret: 'Km0JfgujJVbrZnNdrGvSFPZOIfY' 
})

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// TODO: Add a comment describing the functionality of this statement
app.use(session(sess));
app.use(fileUpload());
app.use(fileUpload());

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/test', (req, res) => {
  res.send('Test page');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.use('/', homeRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', routes);

app.use(passport.initialize());
app.use(passport.session());

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login'); // Redirect unauthenticated users to the login page
};  
app.post('/api/products', isAuthenticated, async (req, res) => {
  try{
    const { product_name, price, description } = req.body;
    const { productImage } = req.files;
    const cloudinaryResponse = await cloudinary.uploader.upload(productImage.tempFilePath);
    const newProduct = await Product.create({
      product_name,
      price,
      description,
      imageUrl: cloudinaryResponse.secure_url,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Failed to create a new product'});
  }
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});