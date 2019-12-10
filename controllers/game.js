const Questionnaire = require('../models/questionnaire');

module.exports = {
    async getRandomQuestionnaire(request, response) {
        let questionnaire = await Questionnaire.find()

        console.log("GETTING RANDOM")
        if (questionnaire) {
            response.json(questionnaire[0]);
        } else {
            response.send("not found")
        }
    }
}
