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
  // Chris's code
  knex('posts as p').select('p.id as post_id', 'u.alias', 'p.user_id as user_id', 'p.title', 'p.body', 'cp.category_id', 'c.technology')
  .join('users as u', 'p.user_id', 'u.id')
  .join('category_posts as cp', 'p.id', 'cp.post_id')
  .join('categories as c', 'cp.category_id', 'c.id')
  .then(posts => {
    posts = posts.reduce((prev, next) => {
      var post = prev.find(post => { return post.post_id === next.post_id} );
      if (post === undefined) {
        post = {post_id: next.post_id, alias: next.alias, user_id: next.user_id, title: next.title, body: next.body, categories: []}; 
        prev.push(post);
      }
      post.categories.push({category_id: next.category_id, technology: next.technology});
      return prev;
    }, []);
    eval(require('locus'))
    res.json(posts)
  }).catch(function(err){
      res.render("error", {err})
  })
})

// knex('posts').then(posts =>{
//   res.json(posts);
// })
// })

router.get('/categories', (req,res) => {
  knex('categories').then(categories => {
        res.json(categories)
      })
})


module.exports = router;
