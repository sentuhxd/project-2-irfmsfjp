const router = require('express').Router();
const { Cart, Product, User } = require('../models'); 
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      let currentUser = req.session.loggedIn;
      console.log(currentUser)
      let products = await Product.findAll();

      // handlebars does not like sequalize model objects
      products = JSON.parse(JSON.stringify(products)); // plain old Javascript objects

      res.render('homepage', {
        loggedIn: currentUser,
        products
      });
    } catch (err) {
      console.log("error", err)
      res.status(500).json(err);
    }
});
    
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
})

module.exports = router;
    