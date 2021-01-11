const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Score = require('../models/score');

const getScores = async (req, res, next) => {
	let scores;
	try {
		scores = await Score.find();
	} catch (err) {
		const error = new HttpError('Cant find it buddy!', 500);
		return next(error);
	}

	res.json({
		scores: scores.map((score) => score.toObject({ getters: true })),
	});
};

const getSingleScore = async (req, res, next) => {
	const scoreId = req.params.sid;
	let score;
	try {
		score = await Score.findById(scoreId);
	} catch (err) {
		const error = new HttpError('Unable to find matching score.', 500);
		return next(error);
	}

	res.json({
		playerOneScore: score.playerOneScore,
		playerTwoScore: score.playerTwoScore,
		isFinished: score.isFinished,
	});
};

const postScore = async (req, res, next) => {
	const { date } = req.body;

	const newScore = new Score({
		playerOneName: req.body.playerOneName,
		playerTwoName: req.body.playerTwoName,
		playerOneScore: req.body.playerOneScore,
		playerTwoScore: req.body.playerTwoScore,
		date: date,
		isFinished: req.body.isFinished,
	});

	try {
		// const sess = await mongoose.startSession();
		// sess.startTransaction();
		// await newScore.save({ session: sess });
		// await sess.commitTransaction();
		await newScore.save();
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, please try again later.',
			500
		);
		return next(err);
	}

	res.status(201).json({
		newScore,
	});
};

const updateScore = async (req, res, next) => {
	const scoreId = req.params.sid;
	const { playerOneScore, playerTwoScore, isFinished } = req.body;

	let score;

	try {
		score = await Score.findById(scoreId);
	} catch (err) {
		const error = new HttpError(
			'Somthing went wrong, could not find place.',
			500
		);
		return next(error);
	}

	if (playerOneScore !== undefined) {
		score.playerOneScore = playerOneScore;
	}
	if (playerTwoScore !== undefined) {
		score.playerTwoScore = playerTwoScore;
	}
	if (isFinished !== undefined) {
		score.isFinished = isFinished;
	}

	try {
		await score.save();
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not update score.',
			500
		);
		return next(error);
	}

	res.status(200).json({ score: score.toObject({ getters: true }) });
};

const deleteScore = async (req, res, next) => {
	const scoreId = req.params.sid;

	let score;
	try {
		score = await Score.findById(scoreId);
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not delete place.',
			500
		);
		return next(error);
	}

	if (!score) {
		const error = new HttpError('Could not find game for this id.', 404);
		return next(error);
	}

	try {
		score.remove();
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not delete place.',
			500
		);
		return next(error);
	}

	res.status(200).json({ message: 'Deleted place.' });
};

exports.getScores = getScores;
exports.getSingleScore = getSingleScore;
exports.postScore = postScore;
exports.updateScore = updateScore;
exports.deleteScore = deleteScore;
