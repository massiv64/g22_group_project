const express = require("express")
const router = express.Router({mergeParams: true});
const knex = require("../db/knex")
const Promise = require("bluebird")
const _ = require("lodash")
const markdown = require('markdown').markdown;
const authHelpers = require ('../helpers/authHelpers')


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

router.get('/new', authHelpers.ensureCorrectUserForNewPost,(req,res) => {
  knex('users').where({id: req.params.user_id}).first().then((user) => {
    knex('categories').then(categories => {
      res.render("posts/new", {user, categories})
    })
  })
})

router.get('/:id', (req,res) => {
  res.format({
    html: function(){
      res.render('posts/react', {user:req.user});
    },

    json: function(){
      knex('posts').where('id', req.params.id).first().then((post) =>{
        knex('users').where('id', post.user_id).first().then((post_author) => {
          knex('comments').leftJoin('users', 'comments.user_id', 'users.id').where('post_id', post.id).then((comments) => {
            knex('category_posts').where('post_id', post.id).then((category_relations) =>{
              knex('categories').where('id', category_relations.category_id).then((categories) =>{
                post.body = markdown.toHTML(post.body);
                comments.forEach(function(val, index){
                  val.content = markdown.toHTML(val.content);
                })
                res.json({post: post, post_author:post_author, categories:categories, comments:comments});
              })
            })
          })
        })
      })
    }
  });


})




// router.get('/:id', (req,res) => {
//   knex('posts').where({id: req.params.id}).first().then((post) =>{
//     knex('users').where({id: req.params.user_id}).first().then( user => {
//       knex('comments as c')
//       .select('c.id as cid', 'c.content', 'c.post_id as pid', 'u.id as uid', 'u.alias as alias', 'u.photo as photo')
//       .leftOuterJoin('users as u', 'c.user_id', 'u.id')
//       .where('c.post_id', req.params.id)
//       .orderBy('c.id')
//       .then(comments => {
//         comments.forEach(val => {
//           val.content = markdown.toHTML(val.content);
//         });
//         post.body = markdown.toHTML(post.body)
//         res.render("posts/show", {post, comments, user})
//       })
//     })
//   });
// });

router.get('/:id/edit', authHelpers.ensureCorrectUserForEdit, (req,res) => {
  knex('posts').select("posts.id as post_id", "posts.title", "posts.body", "posts.user_id", "users.alias")
  .join("users", "posts.user_id","users.id")
  .where('posts.id', req.params.id)
  .first()
  .then((post) => {
    res.render("posts/edit", {post})
  })
});

router.post('/', (req,res) => {
  var user_id = req.params.user_id;
  var categories = req.body.category;
  var newPost = Object.assign(req.body.post, {user_id})
  knex('posts').insert(newPost).returning("*").then((post) =>{
    var post_id = post[0].id;
    for (var c in categories) {
      knex('categories').where('technology', c).first().then(category => {
        var newCategory = Object.assign({}, {category_id: category.id}, {post_id});
        knex('category_posts').insert(newCategory).then(()=>{
        });
      });
    }
    res.redirect(`/users/${req.params.user_id}/posts`);;
  });
});

router.patch('/:id', authHelpers.ensureCorrectUserForEdit, (req,res) => {
  knex('posts').update(req.body.post, "*").where({id:req.params.id}).then((post) =>{
    res.redirect(`/users/${post[0].user_id}/posts`)
  }).catch((err) =>{
    res.render("error", {err})
  });
});

router.delete('/:id', authHelpers.ensureCorrectUserForEdit, (req,res) => {
  knex('posts').where({id:req.params.id}).first().del().then(() =>{
      res.redirect(`/users/${req.params.user_id}/posts`);
  }).catch((err) =>{
    res.render("error", {err})
  });
});

module.exports = router
