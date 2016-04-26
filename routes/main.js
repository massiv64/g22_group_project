const express = require("express");
const passport = require('passport');
const router = express.Router();
const authHelpers = require('../helpers/authHelpers');
const passwordHelpers = require('../helpers/passwordHelpers');
const knex = require("../db/knex");
const Promise = require("bluebird");
var flash = require('express-flash');

router.use(flash());
// direct to Frontpage
router.get("/", authHelpers.ensureAuthenticated, (req,res) => {
  res.render('main/frontpage');
});


// Auth routes in main.js
router.get('/login', function(req, res, next){
	res.render('auth/login');
})

router.get('/signup', authHelpers.preventLoginSignup, function(req, res, next){
  res.render('auth/signup', {message: req.flash('loginMessage')});
});

router.get('/logout', (req,res) =>{
 req.logout();
 res.redirect('/login');
});

router.get('/google', 
  passport.authenticate('google'));

router.get('/auth/google/callback', passport.authenticate('google', {
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

module.exports = router;


// router.get('/google',
//   passport.authenticate('google'));

// router.get('/auth/google/callback', (req, res) => {
//   passport.authenticate('google', (err, user) => {
//     if(err) return next(err)
//       else {
//         req.logIn(user, (err) => {
//           if(err){
//             req.flash('loginMessge', err)
//             res.redirect('/login')
//           }
//         })
//       }
//   })
// })

router.get('/posts', (req,res) => {
  knex.select("posts.id as post_id", "users.alias", "posts.user_id as user_id", "posts.body", "posts.title").from('posts').join("users", "posts.user_id", "users.id").then((posts) => {
    Promise.map(posts, (p) => {
      return knex('comments').where({post_id: p.post_id}).then(function(comments){
        p.comments = comments
        return p;
    })
  }).then(function(posts){
    res.format({
      'application/json':() => {
        res.send(posts)
      }  
    })
    
  })
  }).catch(function(err){
    res.render("error", {err})
  })
});

module.exports = router
