const bcrypt = require("bcrypt");
const knex = require("../db/knex")
const passportLocal = require("passport-local");
const passport = require("./passport");


const handleErrors = (req) => {
  return new Promise((resolve,reject) => {
    if(req.body.user.email.length < 6) {
      reject({
        err:'email_length',
        message:'Email must be longer than 6 characters'
      })
    }
    else if(req.body.user.password.length < 6) {
      reject({
        err:'password_length',
        message:'Password must be longer than 6 characters'
      })
    }
    else {
      resolve()
    }
  })
}

exports.createUser = (req)=> {
    return handleErrors(req).then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(req.body.user.password, salt);
      return knex('users').insert({
        email: req.body.user.email,
        password:hash,
        is_verified: 0
      }, "*")
    })
},

exports.editUser = (req, res, done)=> {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(req.body.user.password, salt)
      if(req.user.token){ 
        knex('users').where('id', +req.user.id).first().update({
        is_verified: true,
        email:req.body.user.email,
        alias: req.body.user.alias,
        photo: req.body.user.photo,
        password: hash,
      }).then(function(){
        return done()
       })
      } else {
        knex('users').where({id: req.user.id}).first().update({
        password: hash,
        email: req.body.user.email,
        photo: req.body.user.photo,
        alias: req.body.user.alias,
      }).then(function(){
        return done()
      })
    }
  }

exports.comparePass = (userpass, dbpass) => bcrypt.compareSync(userpass, dbpass);