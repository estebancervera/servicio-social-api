const express = require('express');
const router = express.Router();

/* Imports AWS Image Functions */
const { upload } = require('../config/aws');

/* Controllers */
const { registerUser, logInUser } = require('../controllers/login-controller');

//MODELS

//router.post('/register', upload.none(), registerUser);
router.post('/login', upload.none(), logInUser);

module.exports = router;
