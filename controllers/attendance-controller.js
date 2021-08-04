/*  Models */

const Attendance = require('../models/attendance');

async function getAllAttendance(req, res) {
	try {
		const attendances = await Attendance.find({}).sort({ date: -1 });

		res.status(200).json({ error: false, msg: 'All Attendance returned', data: attendances });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: error.message });
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
		res.status(500).json({ error: true, msg: error.message });
	}
}

async function createAttendance(req, res) {
	try {
		console.log(req.body);
		if (!req.body.date || !req.body.uuid || req.body.people) {
			throw new Error('Falta de parametros');
		}

		const body = {
			date: req.body.date,
			uuid: req.body.uuid,
			people: req.body.people.split(',')
		};

		const attendance = await new Attendance(body);

		attendance.save();

		res.status(201).json({ error: false, msg: 'Attendance Created', data: attendance });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: error.message });
	}
}

async function updateAttendance(req, res) {
	try {
		console.log(req.body);
		if (!req.body.date) {
			throw new Error('Falta de parametros');
		}

		const attendance = {
			date: req.body.date,
			people: req.body.people.split(',')
		};

		const updatedAttendance = await Attendance.findByIdAndUpdate(req.params.id, attendance, { new: true });

		updatedAttendance.save();
		res.status(200).json({ error: false, msg: 'Attendance updated', data: updatedAttendance });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: error.message });
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
		res.status(500).json({ error: true, msg: error.message });
	}
}

module.exports = {
	getAllAttendance,
	getAttendance,
	createAttendance,
	updateAttendance,
	deleteAttendance
};
