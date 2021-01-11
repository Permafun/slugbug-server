const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scoreSchema = new Schema({
	playerOneName: { type: String, required: true },
	playerTwoName: { type: String, required: true },
	playerOneScore: { type: Number, required: true },
	playerTwoScore: { type: Number, required: true },
	date: { type: Date, required: true },
	isFinished: { type: Boolean, required: true },
});

module.exports = mongoose.model('Score', scoreSchema);
