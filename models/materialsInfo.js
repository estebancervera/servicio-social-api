const mongoose = require('mongoose');

const { Schema } = mongoose;

const materialsInfoSchema = new Schema({
	walls: {
		type: String,
		default: '',
		required: false
	},
	ceilings: {
		type: String,
		default: '',
		required: false
	},
	floors: {
		type: String,
		default: '',
		required: false
	},
	hygiene: {
		type: String,
		default: '',
		required: false
	},
	bathroom: {
		type: String,
		default: '',
		required: false
	}
});

module.exports = mongoose.model('MaterialsInfo', materialsInfoSchema);
