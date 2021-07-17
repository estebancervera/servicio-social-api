module.exports = {
	// Server port
	port: process.env.MONGODB_URI,

	// Secret for cookie sessions
	cookieSecret: process.env.COOKIE_SECRET,

	// Configuration for MongoDB
	mongoUri: process.env.MONGODB_URI,

	refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,

	accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,

	accessExpire: process.env.ACCESS_EXPIRES_IN,

	signupTokenSecret: process.env.SIGNUP_TOKEN_SECRET
};
