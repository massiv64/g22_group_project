const express = require("express")
const router = express.Router({mergeParams: true});
const knex = require("../db/knex")
const markdown = require('markdown').markdown;
const authHelpers = require('../helpers/authHelpers')

router.get('/', (req,res) => {
  knex('comments').where({post_id: req.params.post_id}).then((comments) =>{
    knex('posts').where({id: req.params.post_id}).first().then((post) => {
      comments.forEach(function(val) {
        val.content = markdown.toHTML(val.content) 
      });
      res.render("comments/index", {comments,post})
    })
  }).catch((err) =>{
    res.render("error", {err})
  });
});

router.get('/new', (req,res) => {
  knex('posts').where({id: req.params.post_id}).first().then((post) => {
    res.render("comments/new", {post})
  })
})

router.get('/:id', (req,res) => {
  knex('comments').where({id: req.params.id}).first().then((post) =>{
    res.render("comments/show", {post})
  }).catch((err) =>{
    res.render("error", {err})
  });
});

router.get('/:id/edit', authHelpers.ensureCorrectUserForEditComments, (req,res) => {
  res.render("comments/edit")
});

// Fixing this route, so user is bringing back to the post when a comment is added.
router.post('/', (req,res) => {
  var user_id = req.user.id;
  var post_id = req.params.post_id;
  var newComment = Object.assign(req.body.comment, {user_id}, {post_id})
  knex('comments').insert(newComment).then(() =>{
    knex('posts').join('users', 'posts.user_id', 'users.id')
      .where('posts.id', post_id)
      .first()
      .then(user => {
      res.redirect(`/users/${user.user_id}/posts/${post_id}`);  
    })
  });
});


router.patch('/:id', (req,res) => {
  knex('comments').where({id:req.params.id}).update(req.body.comment).then(() =>{
    res.redirect(`/posts/${req.params.post_id}/comments`)
  }).catch((err) =>{
    res.render("error", {err})
  });
});

router.delete('/:id',authHelpers.ensureCorrectUserForEditComments, (req,res) => {
  knex('comments').where({id:req.params.id}).returning("*").first().del().then((post) =>{
    res.redirect(`/posts/${req.params.post_id}/comments`)
  }).catch((err) =>{
    res.render("error", {err})
  });
});


module.exports = router