const router = require('express').Router();
const { Cart, Product, CartItem } = require('../models'); 
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      let currentUser = req.session.loggedIn;
      let cart;
      let products = await Product.findAll();
      if (currentUser) {
        cart = await Cart.findOne({
          include: [
            { model: CartItem },
            {
              model: Product,
              through: CartItem,
              as: 'cart_products'
            }
          ],
          where: {
            user_id: user.id
          }
        })
      } 

      // process cartitems and cart_products

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



module.exports = router;
    