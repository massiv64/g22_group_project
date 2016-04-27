const authMiddleware  = {
  ensureAuthenticated(req,res,next){
    console.log(req.session);
    if (!req.user){
      req.session.flash = {}
      req.flash('loginMessage', "Please log in first")
      return res.redirect('auth/login');
    }
    else {
      return next();
    }
  },
  ensureCorrectUserForPost(req,res,next){
    if(+req.params.id === req.user.id){
      return next()
    }
    else {
      res.redirect('#')
    }
  },
  preventLoginSignup(req, res, next) {
    if (req.user) {
      return res.redirect(`/`);
    }
    else {
     return next();
    }
  },
  //should ensure only the current user can edit/update posts that pertain to their id - nicarooni	
  ensureCorrectUserForEdit(req,res,next){
    eval(require('locus'))
  	if (+req.params.id === req.user.id){
  		return next()
  	} else {
  		res.redirect('/users/:user_id/posts/:post_id')
  	}
  },
  currentUser(req, res, next) {
    // if the user is authenticated (passport method returns true when serialized)
    if (req.isAuthenticated()) {
      // this is available in the view for all requests, deserializing FTW
      res.locals.currentUser = req.user;
      return next();
    }
    else {
      return next();
    }
  },
}
module.exports = authMiddleware;