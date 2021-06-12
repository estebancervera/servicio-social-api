require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');

require('./config/passport2')(passport);
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

//Routes

/*
    === API ===
*/

app.use('/people', require('./routes/peoples'));
app.use('/attendance', require('./routes/attendances'));

//Listen

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
