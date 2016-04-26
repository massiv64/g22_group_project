const express = require("express")
const router = express.Router({mergeParams: true});
const knex = require("../db/knex")
const Promise = require("bluebird")
const _ = require("lodash")
const markdown = require('markdown').markdown;


//should show all of the comments associated to that post along withe comment 



router.get('/', (req,res) => {
  knex('posts').where({user_id: req.params.user_id}).then((posts) =>{
        knex('users').where({id: req.params.user_id}).first().then((user) => {
          posts.forEach(function(val,index) {
            val.body = markdown.toHTML(val.body) 
          });
          res.render("posts/index", {posts,user})
        })
  }).catch((err) =>{
    res.render("error", {err})
  });
});

router.get('/new', (req,res) => {
  knex('users').where({id: req.params.user_id}).first().then((user) => {
      res.render("posts/new", {user})
  })
})

router.get('/:id', (req,res) => {

  knex('posts').where({id: req.params.id}).first().then((post) =>{
//sara's edits to try to join to the user table. work in progress
    knex('comments').where({post_id: req.params.id}).then( (comment) => {
      // knex('users').where({id: user_id}).then ( (user) => {
    // eval(require('locus'));
    res.render("posts/show", {post,comment, user})
        // })
      })
    }).catch((err) =>{
      res.render("error", {err})
//chris's edits  for the markdown 
    post.body = markdown.toHTML(post.body)
    res.render("posts/show", {post})
  }).catch((err) =>{
    res.render("error", {err})

  });
});


router.get('/:id/edit', (req,res) => {
  knex.select("posts.id as post_id", "posts.title", "posts.body", "posts.user_id", "users.alias").from('posts').where({"posts.id": req.params.id}).join("users", "posts.user_id","users.id").first().then((post) => {
      res.render("posts/edit", {post})
    })
});

router.post('/', (req,res) => {
  knex.insert(req.body.post, "*").into('posts').then((post) =>{
    knex('posts').where({id: post[0].id}).update({user_id: req.params.user_id})
      .then(function(){
            res.redirect(`/users/${req.params.user_id}/posts`);
          })
  });
});

router.patch('/:id', (req,res) => {

  knex('posts').update(req.body.post, "*").where({id:req.params.id}).then((post) =>{
    res.redirect(`/users/${post[0].user_id}/posts`)
  }).catch((err) =>{
    res.render("error", {err})
  });
});

router.delete('/:id', (req,res) => {
  knex('posts').where({id:req.params.id}).first().del().then(() =>{
      res.redirect(`/users/${req.params.user_id}/posts`);
  }).catch((err) =>{
    res.render("error", {err})
  });
});


module.exports = router
