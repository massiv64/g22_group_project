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
