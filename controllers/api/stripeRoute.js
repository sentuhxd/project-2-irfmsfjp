const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51NxZSzBVsAs3ng48C78qHNSsEzS3qvrxGfiSiFyBD8ILdrPunnnppuSCKXj8qQADt9m9oAM65Rp4B75Y2HlbCGB900enyCSmTV');

app.use(express.static('public'));
app.use(express.json());

// Maintain a server-side cart as a simple JavaScript array
const cart = [];

app.post('/add-to-cart', (req, res) => {
  // Add a product to the cart (you need to pass the product details)
  const product = req.body;
  cart.push(product);
  res.json({ success: true });
});

router.get('/cart', (req, res) => {
  // Return the cart contents
  res.json(cart);
});

router.post('/create-checkout-session', async (req, res) => {
  // Create a checkout session using Stripe
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: cart.map(item => ({
      price: 'YOUR_PRODUCT_PRICE_ID', // Replace with actual Stripe Price ID
      quantity: 1,
    })),
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

module.exports = router;