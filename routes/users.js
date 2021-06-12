const express = require('express');
const router = express.Router();

/* Controllers */
const { registerUser, logInUser } = require('../controllers/login-controller');

//MODELS

router.get('/register', registerUser);
router.get('/login', logInUser);

module.exports = router;
