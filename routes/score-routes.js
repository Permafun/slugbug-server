const express = require('express');

const scoreController = require('../controllers/score-controller');

const router = express.Router();

router.get('/:sid', scoreController.getSingleScore);

router.get('/', scoreController.getScores);

router.patch('/:sid', scoreController.updateScore);

router.post('/', scoreController.postScore);

router.delete('/:sid', scoreController.deleteScore);

module.exports = router;
