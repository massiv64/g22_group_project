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
const SALT_WORK_FACTOR = 10;


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



router.put('/', passwordHelpers.editUser, (req,res) => {
      res.redirect('/account')
});

module.exports = router;