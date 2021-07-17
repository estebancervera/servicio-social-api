const express = require('express');
const router = express.Router();

/* Imports AWS Image Functions */
const { upload } = require('../config/aws');

/* auth */
const { authenticateAccessToken } = require('../config/auth');

/* Controllers */
const {
	getAllAttendance,
	getAttendance,
	createAttendance,
	updateAttendance,
	deleteAttendance
} = require('../controllers/attendance-controller');

//MODELS

router.get('/', authenticateAccessToken, getAllAttendance);
router.get('/:id', authenticateAccessToken, getAttendance);
router.post('/', authenticateAccessToken, upload.none(), createAttendance);
router.put('/:id', authenticateAccessToken, upload.none(), updateAttendance);
router.delete('/:id', authenticateAccessToken, deleteAttendance);

module.exports = router;
