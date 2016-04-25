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

router.get('/profile', function(req, res, next){
	res.render('users/profile', {user:req.user});
});

router.get('/:id', (req,res) => {
  knex('users').where({id: req.params.id}).first().then((user) =>{
    res.render("users/show", {user})
  }).catch((err) =>{
    res.render("error", {err})
  });
});

router.get('/:id/edit', (req,res) => {
  knex('users').where({id: req.params.id}).first().then((user) =>{
    res.render("users/edit", {user})
  }).catch((err) =>{
    res.render("error", {err})
  });
});

router.post('/', (req,res) => {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    bcrypt.hash(req.body.user.password, salt, (err, hash) => {
      knex('users').insert({
        email: req.body.user.email,
        password: hash
      }).then(() => {
        res.redirect('/users')
      }).catch(err => {
        res.render('new')
      });
    });
  });

  knex('users').insert(req.body.user).then(() =>{
    res.redirect('/users')
  }).catch((err) =>{
    res.render("error", {err})
  });
});

router.patch('/:id', (req,res) => {
  knex('users').where({id:req.params.id}).update(req.body.user).then(() =>{
    res.redirect('/users')
  }).catch((err) =>{
    res.render("error", {err})
  });
});

router.delete('/:id', (req,res) => {
  knex('users').where({id:req.params.id}).del().then(() =>{
    res.redirect('/users')
  }).catch((err) =>{
    res.render("error", {err})
  });
});


module.exports = router;