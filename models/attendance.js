const mongoose = require('mongoose');

const { Schema } = mongoose;

const attendanceSchema = new Schema({
	uuid: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	people: {
		type: [Schema.Types.ObjectId]
	}
});

module.exports = mongoose.model('Attendance', attendanceSchema);
