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
  	if (+req.params.user_id === req.user.id){
  		return next()
  	} else {
  		res.redirect('/users/' +req.params.user_id + '/posts/' +req.params.id)
  	}
  },
  ensureCorrectUserForEditComments(req,res,next){
  	eval(require('locus'))
  	if (+req.user.id === req.session.passport.user){
  		knex('comments').where({id: req.params.id}).first().then((comment) =>{
  			  knex('posts').where({id: comment.post_id}).first().then((post) => {
  				return next()
  	} else {
  		res.redirect('/posts/' +req.params.id + '/comments')
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