
require('dotenv').config()
const express = require('express')
const app = express()
const keys = require('./config/keys')

const stripe = require('stripe')(keys.stripeSecretKey);

const PORT = process.env.PORT || 3001
const db = require('./models')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const cloudinary = require('cloudinary').v2;
const path = require('path');
const bodyParser = require('body-parser')

cloudinary.config({
  cloud_name: 'dk1drdjy9', 
  api_key: '168191626364913', 
  api_secret: 'Km0JfgujJVbrZnNdrGvSFPZOIfY' 
})

app.use(session({
  secret: 'asdwelhjt',
  store: new SequelizeStore({
    db: db.sequelize
  }),
  resave: false,
  // proxy: true // if you do SSL outside of node.
  saveUninitialized: false
  // cookie: { secure: true }
}))




app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.urlencoded({extended: true}));

const exphbs = require('express-handlebars')
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'user' }));

app.use(express.static(`${__dirname}/public`));






const apiRoutes = require('./controllers/apiRoutes.js')
app.use(apiRoutes)

const htmlRoutes = require('./controllers/htmlRoutes.js')
app.use(htmlRoutes)

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`\nServer listening on: http://localhost:${PORT}`))
}).catch((error) => {
  console.log(error)
})
