'use strict';

// load routers
const UsersRouter = require('./routes/users');
const HelloRouter = require('./routes/hello');
const QuestionnaireRoute = require("./routes/questionnaires")
const GameRoute = require("./routes/game")
// Setup Routes
module.exports = function (app) {
    app.use('/users', UsersRouter);
    app.use('/questionnaires', QuestionnaireRoute)
    app.use('/game', GameRoute)
    app.use('/', HelloRouter);
};
