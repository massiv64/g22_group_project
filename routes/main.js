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
  knex('posts as p').select('p.id as post_id', 'u.alias', 'p.user_id as user_id', 'p.title', 'p.body', 'cp.category_id', 'c.technology')
  .leftJoin('users as u', 'p.user_id', 'u.id')
  .leftJoin('category_posts as cp', 'p.id', 'cp.post_id')
  .leftJoin('categories as c', 'cp.category_id', 'c.id').orderBy('p.id', 'asc')
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
    res.send(posts);
  }).catch(function(err){
      res.render("error", {err})
  })
})

router.get('/categories', (req,res) => {
  knex('categories').then(categories => {
    res.json(categories)
  })
})


module.exports = router;
