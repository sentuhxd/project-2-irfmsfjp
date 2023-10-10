const express = require('express').router();
const router = require('../apiRoutes');
const router = express();
const stripe = require('stripe')('sk_test_51NxZSzBVsAs3ng48C78qHNSsEzS3qvrxGfiSiFyBD8ILdrPunnnppuSCKXj8qQADt9m9oAM65Rp4B75Y2HlbCGB900enyCSmTV');
router.use(express.static('public'));
router.use(express.json());

router.post('/add-to-cart', (req, res) => {
    // Add a product to the cart (you need to pass the product details)
    const product = req.body;
    cart.push(product);
    res.json({ success: true });
  });