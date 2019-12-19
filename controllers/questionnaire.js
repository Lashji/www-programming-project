'use strict';

const Questionnaire = require('../models/questionnaire');
// questiontitle includes all the titles submitted by the form
const createNewQuestionnaire = ({
    title,
    points,
    questiontitle,
    option
}) => {
    const newQuestionnaire = {
        title: title,
        questions: parseQuestions(questiontitle, points, option[0]),
    };

    return newQuestionnaire;
};

const parseQuestions = (questiontitles, points, option) => {
    let questions = [];
    console.log("Whole options => ", option)

    // If there is only 1 question data comes as a string instead of a array
    // so changing it to array to simplify things
    if (!Array.isArray(questiontitles)) {
        let tmp = questiontitles
        questiontitles = []
        questiontitles.push(tmp)
    }


    // If there is only 1 question data comes as a string instead of a array
    // so changing it to array to simplify things
    if (!Array.isArray(points)) {
        let tmp = points
        points = []
        points.push(tmp)
    }


    for (let i in questiontitles) {
        let q = {
            title: questiontitles[i],
            maxPoints: points[i],
            options: [],
        };

        for (let j in option) {
            let opt = option[j]
            let tmp = {
                option: opt[0],
                hint: opt[1],
                correctness: opt[2] === 'true',
            }

            console.log("tmp option => ", tmp);
            q.options.push(tmp);
        }
        questions.push(q);
    }
    console.log('parseQuestions returning => ', questions);
    return questions;
};

module.exports = {
    /**
     * Returns list of users
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async list(request, response) {
        const questionnaires = await Questionnaire.find()
            .sort('title')
            .exec();
        console.log('listing', questionnaires);
        response.render('questionnaire/list_questionnaires', {
            questionnaires,
        });
    },
    async show(request, response) {
        const questionnaire = await Questionnaire.findById(request.params.id);
        console.log('questionnaire = ', questionnaire.id);
        response.render('questionnaire/view_questionnaire', {
            questionnaire,
        });
    },
    async create(request, response) {
        console.log('rendering create');
        response.render('questionnaire/create_questionnaire');
    },
    async update(request, response) {

        const q = await Questionnaire.findById(request.params.id);

        console.log('rendering edit');
        response.render('questionnaire/edit_questionnaire', {
            q
        });
    },
    async delete(request, response) { },
    async processCreate(request, response) {
        console.log('procesCreate = ', request.body);

        let data = createNewQuestionnaire(request.body);

        const newQuestionnaire = new Questionnaire()

        newQuestionnaire.title = data.title
        newQuestionnaire.submissions = 1
        newQuestionnaire.questions = data.questions
        console.log("saving new Questionnaire => ", newQuestionnaire)
        //try catchi - flash error msg
        try {
            let questionnaire = await newQuestionnaire.save()

            response.render('questionnaire/view_questionnaire', {
                questionnaire,
            });
        } catch (err) {
            request.flash(
                "errorMessage", err.message
            );
            console.log(err)
            return response.redirect('/questionnaires/new');
        }
    },
    processUpdate(request, response) { },
    processDelete(request, response) { },
};
