require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const config = require('./config/config');

const mongoose = require('mongoose');

require('./config/passport')(passport);
// DB config

const db = process.env.MONGODB_URI;

var origins = {
	origin: '*',
	methods: ['GET', 'PUT', 'POST', 'DELETE'],
	credentials: false
};

// CONNECT TO MONGO
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.log(err));

//Middleware
app.use(cors(origins));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Passport Auth Middleware */
app.use(passport.initialize());
app.use(passport.session());

// Enable sessions using encrypted cookies
app.use(cookieParser(config.secret));
app.use(
	session({
		cookie: { maxAge: 60000 },
		secret: config.cookieSecret,
		signed: true,
		resave: true
	})
);

//Routes

/*
    === API ===
*/
app.use('/', require('./routes/users'));

app.use('/people', require('./routes/peoples'));
app.use('/attendance', require('./routes/attendances'));

//Listen

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
