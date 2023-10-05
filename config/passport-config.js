// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ where: { username } }).then((user) => {
      if (!user) return done(null, false);
      if (!user.validPassword(password)) return done(null, false);
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id).then((user) => {
    done(null, user);
  });
});

module.exports = passport; 