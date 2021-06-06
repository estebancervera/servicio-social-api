const mongoose = require('mongoose');

const { Schema } = mongoose;

const paymentSchema = new Schema({
	uuid: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	reason: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Payments', paymentSchema);
