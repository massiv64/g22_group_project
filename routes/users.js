const express = require("express")
const router = express.Router();
const knex = require("../db/knex")
const passport = require('passport')
const LocalStrategy = require('passport-local').LocalStrategy
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10


//local strategy - nh
passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[passsword]',
    passReqToCallback: true
  },
    function(email, password, next){
      knex('users').where('email', email).first().then(user => {
        if (err) { return done(err) }
          if (!user) {
            return done(null, false)
          }
          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, flase)
          }
          return done(null, user)
      })
    }
));

passport.serializeUser(function(user, done){
  done(null, user.id)
});

passport.deserializeUer(function(user, done) { 
  

})


router.get('/', (req,res) => {
  knex('users').then((users) =>{
    res.render("users/index", {users})
  }).catch((err) =>{
    res.render("error", {err})
  });
});

router.get('/new', (req,res) => {
  res.render("users/new")
})

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