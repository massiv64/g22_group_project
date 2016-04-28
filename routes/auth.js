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

router.get('/logout', (req,res) =>{

  req.logout();
  res.redirect('/auth/login');
});

router.get('/google',
  passport.authenticate('google'));

router.get('/google/callback', passport.authenticate('google', {

  successRedirect: '/auth/success',
  failureRedirect: '/auth/signup',

}));

router.get('/success', (req, res) => {
  if(req.user.is_verified === false){
      res.redirect('/account/edit');
      //the account PUT route will handle the logic to turn is_verified to TRUE
  }
  res.redirect('/')
});

module.exports = router
