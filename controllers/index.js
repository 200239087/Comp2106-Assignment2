let express = require('express');
let router = express.Router();

let passport = require('passport');
let User = require('../models/user');

/* GET home page. */
router.get('/', (req, res, next) => res.render('index', {
  title: 'COMP2106 - Assignment 2',
  user: req.user
}));

router.get('/register', (req, res, next) => res.render('register', {
  title: 'Register',
  user: req.user
}));

router.post('/register', (req, res, next) => {
  User.register(new User({
    username: req.body.username
  }), req.body.password, (err, user) => {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect('/login');
    }
  });
});

router.get('/login', (req, res, next) => {
  let messages = req.session.messages || [];

  req.session.messages = [];

  res.render('login', {
    title: 'Login',
    messages: messages,
    user: req.user
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/characters',
  failureRedirect: '/login',
  failureMessage: 'Invalid Login'
}));

router.get('/logout', (req, res, next) => {
  req.session.messages = [];
  req.logout();
  res.redirect('/login');
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  failureMessage: 'Invalid Login',
  scope: 'email'
}), (req, res, next) => {
  res.redirect('/characters')
});

module.exports = router;
