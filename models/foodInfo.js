const mongoose = require('mongoose');

const { Schema } = mongoose;

const foodInfoSchema = new Schema({
	meats: {
		type: Number,
		default: 0,
		required: true
	},
	eggs: {
		type: Number,
		default: 0,
		required: true
	},
	dairy: {
		type: Number,
		default: 0,
		required: true
	},
	vegetables: {
		type: Number,
		default: 0,
		required: true
	},
	legumes: {
		type: Number,
		default: 0,
		required: true
	},
	cereals: {
		type: Number,
		default: 0,
		required: true
	},
	juices: {
		type: Number,
		default: 0,
		required: true
	},
	sodas: {
		type: Number,
		default: 0,
		required: true
	}
});

module.exports = mongoose.model('FoodInfo', foodInfoSchema);
