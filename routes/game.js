'use strict';

const express = require('express');
const auth = require('../middleware/auth');
const csurf = require('csurf');
const csrfProtection = csurf({
    cookie: false
});

const router = express.Router();
router.use(auth.ensureAuthenticated);
const GameController = require('../controllers/game');

router.get('/', csrfProtection, GameController.listGames)
router.get('/games/:id', csrfProtection, GameController.testTheGame)
router.get('/games/data/:id', csrfProtection, GameController.serveGame)
router.post('/games/:id', GameController.gradeTheResult)
router.get('/random', csrfProtection, GameController.getRandomQuestionnaire)
router.post('/', GameController.startTheGame)


module.exports = router;
