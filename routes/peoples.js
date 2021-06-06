const express = require('express');
const router = express.Router();

/* Imports AWS Image Functions */
const { upload } = require('../config/aws');

/* Controllers */
const {
	getAllPeople,
	getPeople,
	createPeople,
	updatePeople,
	deletePeople
} = require('../controllers/people-controller');

//MODELS

router.get('/', getAllPeople);
router.get('/:id', getPeople);
router.post('/', upload.single('file'), createPeople);
router.put('/:id', upload.single('file'), updatePeople);
router.delete('/:id', deletePeople);

module.exports = router;
