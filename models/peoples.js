const mongoose = require('mongoose');

const { Schema } = mongoose;

const FoodInfo = require('./foodInfo');
const LivingInfo = require('./livingInfo');
const Payment = require('./payments');

const peopleSchema = new Schema({
	image: {
		type: String
	},
	// uuid: {
	// 	type: String,
	// 	required: true
	// },
	name: {
		type: String,
		required: true
	},
	first_last_name: {
		type: String,
		required: true
	},
	second_last_name: {
		type: String,
		required: true
	},
	curp: {
		type: String
	},
	birthday: {
		type: Date,
		required: true
	},
	gender: {
		type: String,
		required: true
	},
	active: {
		type: Boolean
	},
	address: {
		type: String,
		default: '',
		required: false
	},
	phone: {
		type: String,
		default: '',
		required: false
	},
	education: {
		type: String,
		default: '',
		required: false
	},
	is_married: {
		type: Boolean,
		required: false
	},
	number_children: {
		type: Number,
		default: 0,
		required: false
	},
	job: {
		type: String,
		default: '',
		required: false
	},
	place_of_work: {
		type: String,
		default: '',
		required: false
	},
	monthly_income: {
		type: Number,
		default: 0,
		required: false
	},
	insurance: {
		type: String,
		default: '',
		required: false
	},
	food_behavior_weekly: {
		type: FoodInfo.schema,
		required: false
	},
	living_place: {
		type: LivingInfo.schema,
		required: false
	},
	religion: {
		type: String,
		default: '',
		required: false
	},
	given: {
		type: [Payment.schema],
		required: false
	},
	deleted: {
		type: Boolean,
		required: true,
		default: false
	},
	created: {
		type: Date,
		required: true,
		default: Date.now
	}
});

module.exports = mongoose.model('People', peopleSchema);
