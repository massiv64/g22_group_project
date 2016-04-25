const express = require("express")
const router = express.Router();
const knex = require("../db/knex")
const Promise = require("bluebird")

router.get("/", (req,res) => {
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
