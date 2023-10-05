const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const productRoutes = require('./controllers/productRoutes');
const sequelize = require('./config/connection');
const cartRoutes = require('./controllers/cartRoute');
const cloudinary = require('cloudinary').v2;
// TODO: Add a comment describing the functionality of this expression
const SequelizeStore = require('connect-session-sequelize')(session.Store);

cloudinary.config({
  cloud_name: 'dk1drdjy9', 
  api_key: '168191626364913', 
  api_secret: '***************************' 
})
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// TODO: Add a comment describing the functionality of this object
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

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});