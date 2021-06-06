const mongoose = require('mongoose');

const { Schema } = mongoose;

const MaterialsInfo = require('./materialsInfo');

const livingInfoSchema = new Schema({
	ownership_type: {
		type: String,
		default: '',
		required: false
	},
	materials: {
		type: MaterialsInfo.schema
	},
	number_floors: {
		type: Number,
		default: 0,
		required: false
	},
	number_rooms: {
		type: Number,
		default: 0,
		required: false
	},
	sleeping_rooms: {
		type: Number,
		default: 0,
		required: false
	},
	trash_solution: {
		type: String,
		default: '',
		required: false
	}
});

module.exports = mongoose.model('livingInfo', livingInfoSchema);
