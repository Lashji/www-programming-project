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


    },
    async gradeTheResult(request, response) {
        var score = parseInt(request.body.score, 10);
        var maxScore = parseInt(request.body.maxScore, 10);
        console.log(request.body);
        response.render('game-graded', {
            points: score,
            maxPoints: maxScore,
            status: 'graded',
            description: 'minimal viable grader in the express framework',
            title: 'A+ greetings'
        });

    },
    async serveGame(request, response) {
        let questionnaire = await Questionnaire.find()
        parameterID = request.params.id;
        console.log("Getting random question ", questionnaire)
        if (questionnaire) {
            matchingQuestion = 0;
            matching = false;
            for (var i = 0; i < questionnaire.length; i++) {
                if (questionnaire[i].id == parameterID) {
                    console.log("Match!")
                    matching = true;
                    matchingQuestion = i;
                }
            }
            if (matching) {
                let questions = questionnaire[matchingQuestion]
                response.json(questions);
            }
            else {
                response.status(404).end("Not found")
            }
        } else {
            response.status(404).end("Not found")
        }
    },
    async listGames(request, response) {
        let questionnaire = await Questionnaire.find()
        console.log(questionnaire)
        if (questionnaire) {
            response.render("gameList", {
                questionnaire
            })
        } else {
            response.status(404).end("Not found")
        }

    },
    async testTheGame(request, response) {
        console.log("hello");
        console.log(request.params.id);
        parameterID = request.params.id;

        let questionnaire = await Questionnaire.find()
        gameData = "";
        for (var i = 0; i < questionnaire.length; i++) {
            if (questionnaire[i].id == parameterID) {
                console.log("Match!")
                gameData = questionnaire[i];
            }
        }
        console.log(gameData);
        response.render('game',
            gameData
        );
    },
    startTheGame(request, response) {
        console.log(request.body);
    }


}
