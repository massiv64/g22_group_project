const knex = require('../db/knex');

module.exports = {

	ensureAuthenticated: (req, res, next) => {
		if(req.isAuthenticated){
			return next();
		} else {
			req.flash('error', 'Please log in');
			res.redirect('/users/login');
		}
	},

	preventLoginSignup: (req, res, next) => {
		if(req.isAuthenticated){
			res.redirect('/users')
		} else {
			res.redirect('/users/login');
		}

	},
	ensureCorrectUserForPost: (req, res, next) => {
		if(req.session.id === +req.params.user_id){
			return next();
		} else {
			res.redirect('/users');
		}

	},

	currentUser: (req, res, next) => {
		if(!req.session.id){
			return next();
		} else {
			knex('users').where('id', req.session.id).first().then(user => {
				res.locals.currentUser = user;
				delete res.locals.currentUser.password;
				return next();
			});
		}
	}
};
