'use strict';

// load routers
const UsersRouter = require('./routes/users');
const HelloRouter = require('./routes/hello');
const QuestionnaireRoute = require("./routes/questionnaire")
// Setup Routes
module.exports = function (app) {
    app.use('/users', UsersRouter);
    app.use('/questionnaire', QuestionnaireRoute)
    app.use('/', HelloRouter);
};
