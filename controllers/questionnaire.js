'use strict';

const Questionnaire = require('../models/questionnaire');
// questiontitle includes all the titles submitted by the form
const createNewQuestionnaire = ({ title, points, questiontitle, option }) => {
    const newQuestionnaire = {
        title: title,
        points: points,
        questions: parseQuestions(questiontitle, option),
    };

    console.log('createNewQuestionnaire = ', newQuestionnaire);
    return newQuestionnaire;
};

const parseQuestions = (questiontitles, option) => {
    console.log('titles => ', questiontitles);
    console.log('parsing => ', option);

    let questions = {};

    for (let i in questiontitles) {
    }
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
        console.log('rendering edit');
        response.render('questionnaire/edit_questionnaire');
    },
    async delete(request, response) {},
    async processCreate(request, response) {
        console.log('procesCreate = ', request.body);

        const data = createNewQuestionnaire(request.body);

        const questionnaire = await Questionnaire.find()[0];
        // const questionnaire = Questionnaire.create();
        console.log('found questionnaire = ', questionnaire);

        response.render('questionnaire/view_questionnaire', {
            questionnaire,
        });
    },
    processUpdate(request, response) {},
    processDelete(request, response) {},
};
