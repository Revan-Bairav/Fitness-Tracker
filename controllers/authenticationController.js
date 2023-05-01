const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Registration function
function register(req, res, next) {
  const { username, email, password, confirmPassword } = req.body;
  // Check if password and confirmPassword fields match
  if (password !== confirmPassword) {
    return res.render('register', { error: 'Passwords do not match' });
  }

  // Check if username field is provided
  if (!username) {
    return res.render('register', { error: 'Username is required' });
  }

  const newUser = new User({ username, email, password });
  newUser.save(function (err) {
    if (err) {
      return next(err);
    }
    req.login(newUser, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/dashboard');
    });
  });
}

// Login function
function login(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { 
        return next(err); 
      }
      if (!user) { 
        return res.redirect('/login'); 
      }
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (err) { 
          return next(err); 
        }
        if (!result) {
          return res.redirect('/login');
        }
        req.logIn(user, function(err) {
          if (err) { 
            return next(err); 
          }
          return res.redirect('/dashboard');
        });
      });
    })(req, res, next);
  }

module.exports = { register, login };
