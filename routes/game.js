'use strict';

const express = require('express');
const auth = require('../middleware/auth');
const csurf = require('csurf');
const csrfProtection = csurf({
    cookie: false
});

const router = express.Router();
const GameController = require('../controllers/game');

// console.log("gamecontroller", GameController)
router.get('/random', csrfProtection, GameController.getRandomQuestionnaire)


module.exports = router;
