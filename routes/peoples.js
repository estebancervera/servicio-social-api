const express = require('express');
const router = express.Router();

/* Imports AWS Image Functions */
const { upload } = require('../config/aws');

/* auth */
const { authenticateAccessToken } = require('../config/auth');

/* Controllers */
const {
	getAllPeople,
	getAllPeopleList,
	getPeople,
	createPeople,
	updatePeople,
	deletePeople
} = require('../controllers/people-controller');

//MODELS

router.get('/', authenticateAccessToken, getAllPeople);
router.get('/list', authenticateAccessToken, getAllPeopleList);
router.get('/:id', authenticateAccessToken, getPeople);
router.post('/', authenticateAccessToken, upload.single('file'), createPeople);
router.put('/:id', authenticateAccessToken, upload.single('file'), updatePeople);
router.delete('/:id', authenticateAccessToken, deletePeople);

module.exports = router;
