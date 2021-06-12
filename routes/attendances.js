const express = require('express');
const router = express.Router();

/* Imports AWS Image Functions */
const { upload } = require('../config/aws');

/* Controllers */
const {
	getAllAttendance,
	getAttendance,
	createAttendance,
	updateAttendance,
	deleteAttendance
} = require('../controllers/attendance-controller');

//MODELS

router.get('/', getAllAttendance);
router.get('/:id', getAttendance);
router.post('/', upload.none(), createAttendance);
router.put('/:id', upload.none(), updateAttendance);
router.delete('/:id', deleteAttendance);

module.exports = router;
