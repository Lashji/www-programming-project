'use strict';

const express = require('express');
const auth = require('../middleware/auth');
const csurf = require('csurf');
const csrfProtection = csurf({
    cookie: false
});

const router = express.Router();
const GameController = require('../controllers/game');

router.get('/game/random', csrfProtection, GameController.getRandomQuestionnaire)


module.exports = router;
