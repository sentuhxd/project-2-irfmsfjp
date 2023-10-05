const router = require('express').Router();
const passport = require('../config/passport-config'); // Require the configured Passport instance
const { User } = require('../models');

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

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;