const Questionnaire = require('../models/questionnaire');

module.exports = {
    async getRandomQuestionnaire(request, response) {
        let questionnaire = await Questionnaire.find()
        if (questionnaire)
            response.send(questionnaire[0]);
        else
            response.send(undefined)
    }
}
