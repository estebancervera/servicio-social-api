const User = require('../models/users');

async function registerUser(req, res) {
	try {
		if (!req.body.email) {
			throw new Error('No email was provided');
		}
		const foundUser = await User.findOne({ email: email });
		if (foundUser) {
			throw new Error('Email is already used.');
		}

		if (!req.body.password) {
			throw new Error('No password was provided');
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
		passport.authenticate('local', (err, user) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				throw new Error('User is missing');
			}

			req.logIn(user, err => {
				if (err) {
					throw new Error('Error with the login ');
				}

				/* User has logged In */
				const access = jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
					expiresIn: `${process.env.ACCESS_EXPIRES_IN}d`
				});
				const refresh = jwt.sign({ id: user._id, email: user.email }, process.env.REFRESH_TOKEN_SECRET);
				const details = 'User logged In correctly.';
				return res.status(200).json({ access: access, refresh: refresh, details: details });
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
