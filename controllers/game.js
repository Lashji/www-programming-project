const Questionnaire = require('../models/questionnaire');

module.exports = {
    async getRandomQuestionnaire(request, response) {
        let questionnaire = await Questionnaire.find()

        console.log("Getting random question ", questionnaire)
        if (questionnaire) {
            response.json(questionnaire[0]);
        } else {
            response.send("not found")
        }
    }
}
