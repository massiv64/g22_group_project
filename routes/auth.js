const express = require("express");
const passport = require('passport');
const router = express.Router();
const authHelpers = require('../helpers/authHelpers');
const passwordHelpers = require('../helpers/passwordHelpers');
const knex = require("../db/knex");
const Promise = require("bluebird");
var flash = require('express-flash');

// Auth routes in main.js
router.get('/login', function(req, res, next){
  res.render('auth/login');
})

router.get('/signup', authHelpers.preventLoginSignup, function(req, res, next){
  res.render('auth/signup', {message: req.flash('loginMessage')});
});

router.get('/logout', (req,res) =>{

  req.logout();
  res.redirect('/auth/login');
});

router.get('/google',
  passport.authenticate('google'));


router.get('/google/callback', passport.authenticate('google', {

  successRedirect: '/',
  failureRedirect: '/auth/signup',

}));


//signing up
router.post('/signup', authHelpers.preventLoginSignup, function(req, res, next) {
  passwordHelpers.createUser(req).then((user) => {
    passport.authenticate('local', function(err, user) {
      if (err) { return next(err); }
      if (!user) {
        return res.redirect('/login');
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.redirect('/');
      });
    })(req, res, next);
  }).catch((err) =>{
    if(err.constraint === 'users_username_unique'){
      req.flash('loginMessage', 'username is already taken')
      res.redirect('/auth/signup');
    }
    else if(err) {
      req.flash('loginMessage', err.message)
      res.redirect('/auth/signup');
    }
    res.render('error', {err})

  })
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: true,
  failureFlash: true
}));

module.exports = router
