const express = require('express');
const passport = require('passport');
const flash    = require('connect-flash');
const session  = require('cookie-session');
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const authHelpers = require('../helpers/authHelpers');
const passwordHelpers = require('../helpers/passwordHelpers');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();

router.use(authHelpers.currentUser);
router.use(authHelpers.ensureAuthenticated)

router.get('/', function(req, res){
	knex('users').where('id', req.user.id).then(function(user){
		res.render('account/show', {user: req.user});
	})
})

router.get('/edit', function(req, res){
	knex('users').where('id', req.user.id).then(function(user){
		res.render('account/edit', {user: req.user});
	})
})

router.put('/', (req,res) => {
  if(req.user.token){
  knex('users').where('id', +req.user.id).first().update({is_verified: true}).then(function(){
    res.redirect('/account')
   })
  }

  knex('users').where('id', +req.user.id).first().update(req.body.user).then(function(){
    res.redirect('/account')
  })
});

module.exports = router;