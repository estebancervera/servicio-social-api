const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports = {
	authenticateAccessToken: (req, res, next) => {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		if (token == null) return res.sendStatus(401);
		//console.log('ACCESS');
		jwt.verify(token, config.accessTokenSecret, (err, user) => {
			if (err) return res.status(403).json({ msg: 'The token provided is not a valid access token.' });

			req.user = user;
			//console.log('ATTEMPT 3');
			next();
		});
	}
};
