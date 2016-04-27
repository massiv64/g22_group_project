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
  successRedirect: '/account/edit',
  failureRedirect: '/signup',
}));

//signing up
router.post('/signup', (req, res) => {
  passwordHelpers.createUser(req).then((user) => {
      req.login(user[0], (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect(`/`);
      })
    }).catch((err) =>{
      if(err.constraint === 'users_email_unique'){
        err.message = 'email is already taken'
      }
      if(err) {
        req.flash('loginMessage', err.message)
        res.redirect('/signup');
      }
      else {
        res.render('error', {err})
      }
    })
  });

router.post('/login',
  passport.authenticate('local', {
  successRedirect: '/users',
  failureRedirect: '/login'
}));

module.exports = router
