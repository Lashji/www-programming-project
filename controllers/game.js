const Questionnaire = require('../models/questionnaire');

module.exports = {
    async getRandomQuestionnaire(request, response) {
        let questionnaire = await Questionnaire.find()

        console.log("Getting random question ", questionnaire)
        if (questionnaire) {
            let random = questionnaire[Math.floor(Math.random() * questionnaire.length)]
            response.json(random);
        } else {
            response.status(404).end("Not found")
        }
    }
}
