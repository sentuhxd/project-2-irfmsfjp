// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(
  new LocalStrategy({
    usernameField: 'email'
  },(email, password, done) => {
    User.findOne({ where: { email:email } }).then((user) => {
      console.log("Server Log - User from DB:", user);
      if (!user) return done(null, false);
      if (!user.checkPassword(password)) return done(null, false);
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