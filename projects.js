const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	subtitle: {
		type: String,
		required: true
	},
	image: {
		type: String,
	},
	description: {
		type: String
	},
	url: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		required: true,
		default: Date.now
	}
});

module.exports = mongoose.model('Project', projectSchema);
