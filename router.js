'use strict';

// load routers
const UsersRouter = require('./routes/users');
const HelloRouter = require('./routes/hello');
const QuestionnaireRoute = require("./routes/questionnaires")
// Setup Routes
module.exports = function (app) {
    app.use('/users', UsersRouter);
    app.use('/questionnaires', QuestionnaireRoute)
    app.use('/', HelloRouter);
};
