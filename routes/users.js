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

router.get('/', function(req, res, next) {
  knex('users').then((users) => {
    res.render('users/index', {users})
  })
});

router.get('/:id', (req,res) => {
  knex('users').where({id: req.params.id}).first().then((user) =>{
    res.render("users/show", {user})
  }).catch((err) =>{
    res.render("error", {err})
  });
});

router.delete('/:id', function(req,res,next){
  knex('users').where('id', req.user.id).del().then(() => {
    req.logout();
    res.redirect('/auth/login');
  })
})


module.exports = router;