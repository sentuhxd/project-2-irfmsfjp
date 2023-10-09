'use strict'
require('dotenv').config()
const express = require('express')
const app = express()
const stripe = require("stripe")('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


const PORT = process.env.PORT || 3001

const db = require('./models')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

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

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


app.use(passport.initialize())
app.use(passport.session())

const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'user' }))
app.set('view engine', 'handlebars')

const apiRoutes = require('./controllers/apiRoutes.js')
app.use(apiRoutes)

const htmlRoutes = require('./controllers/htmlRoutes.js')
app.use(htmlRoutes)

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`\nServer listening on: http://localhost:${PORT}`))
}).catch((error) => {
  console.log(error)
})
