const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../model/user');

function initialize(passport) {
	const authenticateUser = (email, password, done) => {
		User.findOne({ email: email }, function (err, user) {
			if (err) return done(err);

			if (!user) {
				return done(null, false, { message: 'Incorrect email.' });
			}

			bcrypt.compare(password, user.password, function (err, res) {
				if (err) return done(err);

				if (res === false)
					return done(null, false, {
						message: 'Incorrect password.',
					});

				return done(null, user);
			});
		});
	};

	passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
}

module.exports = initialize;
