const bcrypt = require("bcrypt");
const knex = require("../db/knex")

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
      }, "*")
    })
},

exports.editUser = (req)=> {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(req.body.user.password, salt)

     return   knex('users').where({id:req.session.passport.user}).update({
          email: req.body.user.email,
          alias: req.body.user.alias,
          photo: req.body.user.photo,
          password: hash, 
        }, '*')
  
      // return knex('users').where({id: req.params.id}).update({

      //   password: hash
      // }, "*");
},

exports.comparePass = (userpass, dbpass) => bcrypt.compareSync(userpass, dbpass);
