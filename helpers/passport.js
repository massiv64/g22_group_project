const passportLocal = require("passport-local");
const GoogleStrategy = require('passport-google-oauth20').Strategy
const knex = require("../db/knex");
const passwordHelpers = require("./passwordHelpers");

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').load();
}

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['profile', 'email'],
      state: true
  },
  function(accessToken, refreshToken, profile, done){
    knex('users').where('token', profile.id).first().then(user=> {
      // eval(require("locus"))
      if(user){
        return done(null, user);
      }
      else {
        knex('users').insert({
          token: profile.id,
          alias: profile._json.displayName, 
          email: profile._json.emails[0].value,
          photo: profile.photos[0].value
        }, "*").then(user => {
          return done(null, user[0]);
        });
      }
    }).catch(err => {
      return done(err,null);
    });
    }
  ));

  passport.use(new passportLocal.Strategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
    passReqToCallback : true
  },(req,email, password, done) =>{
      knex('users').where({ email }).first().then((user) =>{
        if (!user) {
          return done(null, false, req.flash('loginMessage','Incorrect username.'));
        }
        if(!user.password){
          return done(null, false, req.flash('loginMessage','You already has an account with Google'));
        }
        if (!passwordHelpers.comparePass(password, user.password)) {
          return done(null, false, req.flash('loginMessage', 'Incorrect password.'));
        }
        return done(null, user);
      }).catch((err) => {
        return done(err)
      })
    }
  ));

  passport.serializeUser((user, done) =>{
    done(null, user.id);
  });

  passport.deserializeUser((id, done) =>{
    knex('users').where({id}).first()
      .then((user) =>{
        done(null, user);
      }).catch((err) =>{
        done(err,null);
      });
  });
}