const passport = require('passport');
const bcrypt        = require('bcrypt');
const User          = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      next(err);
      return;
    }

    if (!foundUser) {
      next(null, false, { message: 'Incorrect username' });
      return;
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      next(null, false, { message: 'Incorrect password' });
      return;
    }

    return next(null, foundUser);
  });
}));