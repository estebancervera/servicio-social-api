const express = require('express');
const router = express.Router();

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
router.post('/', createAttendance);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

module.exports = router;
