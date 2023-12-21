const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../model/user');

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return res.status(500).json({
				message: 'An error occurred during authentication.',
				error: err,
			});
		}

		if (!user) {
			return res.status(401).json({ message: 'Invalid username or password.' });
		}

		req.logIn(user, (err) => {
			if (err) {
				return res.status(500).json({
					message: 'An error occurred during login.',
					error: err,
				});
			}

			return res.status(200).json({
				message: 'You have successfully logged in.',
				user: user,
			});
		});
	})(req, res, next);
});

router.post('/signup', (req, res, next) => {
	const { username, password, email } = req.body;

	// Check if the username and password are provided
	if (!email || !password) {
		return res.status(400).json({ message: 'Email and password are required.' });
	}

	if (!username) {
		return res.status(400).json({ message: 'Username is required.' });
	}

	// Check if a user with the same username already exists
	User.findOne({ email: email }, (err, user) => {
		if (err) {
			return res.status(500).json({
				message: 'An error occurred while checking for existing user.',
				error: err,
			});
		}

		if (user) {
			return res.status(409).json({ message: 'A user with this email already exists.' });
		}

		// Hash the password
		bcrypt.hash(password, 10, (err, hashedPassword) => {
			if (err) {
				return res.status(500).json({
					message: 'An error occurred while hashing the password.',
				});
			}

			// Save the new user to the database
			const newUser = new User({
				username: username,
				password: hashedPassword,
				email: email,
			});

			newUser.save((err) => {
				if (err) {
					return res.status(500).json({
						message: 'An error occurred while saving the user.',
					});
				}

				req.logIn(newUser, (err) => {
					if (err) {
						return res.status(500).json({
							message: 'An error occurred during login.',
						});
					}
					return res
						.status(201)
						.json({ message: 'User successfully registered and logged in.' });
				});
			});
		});
	});
});

module.exports = router;
