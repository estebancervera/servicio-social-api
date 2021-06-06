/* Imports AWS Image Functions */

const { deleteS3 } = require('../config/aws');

/*  Models */

const People = require('../models/peoples');
const Attendance = require('../models/attendance');

async function getAllAttendance(req, res) {
	try {
		const attendances = await Attendance.find({});

		res.status(200).json({ error: false, msg: 'All Attendance returned', data: attendances });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: 'ERROR' });
	}
}

async function getAttendance(req, res) {
	try {
		if (!req.params.id) {
			throw new Error('No id was provided');
		}
		const attendance = await Attendance.findById(req.params.id);

		res.status(200).json({ error: false, msg: 'Attendance returned', data: attendance });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: error });
	}
}

async function createAttendance(req, res) {
	try {
		if (!req.file) {
			throw new Error('No image was provided. Images are required');
		}
		const attendance = await new Attendance(req.body);

		attendance.save();

		res.status(201).json({ error: false, msg: 'Attendance Created', data: attendance });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: 'ERROR' });
	}
}

async function updateAttendance(req, res) {
	try {
		const updatedAttendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });

		updatedAttendance.save();
		res.status(200).json({ error: false, msg: 'Attendance updated', data: updatedProject });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: 'ERROR' });
	}
}

async function deleteAttendance(req, res) {
	try {
		if (!req.params.id) {
			throw new Error('No id was provided');
		}
		await Attendance.findByIdAndDelete(req.params.id);

		res.status(200).json({ error: false, msg: 'Attendance Deleted' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: 'ERROR' });
	}
}

module.exports = {
	getAllAttendance,
	getAttendance,
	createAttendance,
	updateAttendance,
	deleteAttendance
};
