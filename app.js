const express = require("express")
const app = express()
const methodOverride = require("method-override");
const path = require('path');
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const routes = require("./routes")
const flash = require('connect-flash')
const passport = require('passport')
const session  = require('cookie-session')
const helpers = require('./helpers/authHelpers')

if (app.get('env') === 'development' || app.get('env') === 'test') {
  require('dotenv').load();
}

app.set("view engine", "jade");
app.use(express.static(__dirname + "/public"));
app.use(morgan("tiny"))
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET
}));
app.use(methodOverride("_method"));
app.use(passport.initialize())
app.use(passport.session())

require('./helpers/passport.js')(passport);

app.use(helpers.currentUser);
app.use('/', routes.main);
app.use('/auth', routes.auth);
app.use('/users', routes.users);
app.use('/account', routes.account);
app.use('/users/:user_id/posts', routes.posts);
app.use('/posts/:post_id/comments', routes.comments);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});

module.exports = app;
