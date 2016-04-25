const express = require("express")
const router = express.Router();
const knex = require("../db/knex")
const passport = require('passport')
const LocalStrategy = require('passport-local').LocalStrategy
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10



router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');
}); 

//router.get('/', helpers.ensureAuthenticated, (req,res) => {
//  knex('users').then((users) =>{
//    res.render("users/index", {users})
//  }).catch((err) =>{
//    res.render("error", {err})
//  });
//});
//
//router.get('/new',helpers.preventLoginSignup, (req,res) => {
//  res.render("users/new")
//})

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