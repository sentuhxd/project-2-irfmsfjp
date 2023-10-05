// userRoutes.js
const router = require('express').Router();
const passport = require('../config/passport'); // Require the configured Passport instance
const { User } = require('../../models');

// Update the POST /login route to use Passport's authenticate method
router.post('/login', passport.authenticate('local'), (req, res) => {
  // This callback will only be called if authentication is successful
  res.json({ user: req.user, message: 'You are now logged in!' });
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;