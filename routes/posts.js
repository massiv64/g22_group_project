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
    knex('categories').then(categories => {
      res.render("posts/new", {user, categories})
    })
  })
})

router.get('/:id', (req,res) => {
  knex('posts').where({id: req.params.id}).first().then((post) =>{
    knex('users').where({id: req.params.user_id}).first().then( user => {
      knex('comments as c')
      .select('c.id as cid', 'c.content', 'c.post_id as pid', 'u.id as uid', 'u.alias as alias', 'u.photo as photo')
      .leftOuterJoin('users as u', 'c.user_id', 'u.id')
      .where('c.post_id', req.params.id)
      .orderBy('c.id')
      .then(comments => {
        comments.forEach(val => {
          val.content = markdown.toHTML(val.content);
        });
        post.body = markdown.toHTML(post.body)
        res.render("posts/show", {post, comments, user})
      })
    })
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
