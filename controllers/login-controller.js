const passport = require('passport');
const jwt = require('jsonwebtoken');

const { refreshTokenSecret, accessExpire, accessTokenSecret } = require('../config/config');

const User = require('../models/users');

async function registerUser(req, res) {
	try {
		if (!req.body.email) {
			throw new Error('No email was provided');
		}
		const foundUser = await User.findOne({ email: req.body.email });
		if (foundUser) {
			throw new Error('Email is already used.');
		}

		if (!req.body.password || !req.body.firstname || !req.body.lastname) {
			throw new Error('Missing Information ');
		}
		const newUser = await User.register(new User(req.body), req.body.password);

		newUser.save();

		res.status(201).json({ error: false, msg: 'User created successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).send({ msg: 'Server Error' });
	}
}

async function logInUser(req, res, next) {
	try {
		console.log(req.body);
		passport.authenticate('local', (err, user) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				throw new Error("User doesn't exist");
			}

			req.logIn(user, err => {
				if (err) {
					console.log(err);
					throw new Error('Error with the login ');
				}

				/* User has logged In */
				const access = jwt.sign({ id: user._id, email: user.email }, accessTokenSecret, {
					expiresIn: `${accessExpire}h`
				});
				//const refresh = jwt.sign({ id: user._id, email: user.email }, refreshTokenSecret);
				const details = 'User logged In correctly.';
				const userData = {
					firstname: user.firstname,
					lastname: user.lastname
				};
				return res.status(200).json({ token: access, details: details, user: userData });
			});
		})(req, res, next);
	} catch (error) {
		console.error(error);
		res.status(500).send({ msg: 'Server Error' });
	}
}

module.exports = {
	registerUser,
	logInUser
};
