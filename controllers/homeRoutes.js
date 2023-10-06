const router = require('express').Router();
const { Cart, Product, CartItem, User} = require('../models'); 
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      let currentUser = req.session.loggedIn;
      let cartData;
      let products = await Product.findAll();
      if (currentUser) {
        cartData = await Cart.findOne({
          include: [
            { model: CartItem },
            {
              model: Product,
              through: CartItem,
              as: 'cart_products'
            }
          ],
        })
      }
      const cart = cartData.get({plain:true});
      

      // process cartitems and 

      // handlebars does not like sequalize model objects
      products = JSON.parse(JSON.stringify(products)); // plain old Javascript objects
      console.log('cart', cart);
      res.render('homepage', {
        loggedIn: currentUser,
        products,
        cart
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

router.get('/user-store', (req, res) => {
  res.render('user-store'); 
});

router.get('/user', (req, res) => {
  res.render('user'); 
});

module.exports = router;
    