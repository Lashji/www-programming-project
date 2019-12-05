"use strict"

const Questionnaire = require('../models/questionnaire');
module.exports = {

    /**
     * Returns list of users
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async list(request, response) {
        const questionnaire = await Questionnaire.find()
            .sort('title')
            .exec()
        console.log("listing", questionnaire)
        response.render("questionnaire/list_questionnaires", {
            questionnaire
        })
    },
    async show(request, response) {

    },
    async create(request, response) {

    },
    async update(request, response) {

    },
    async delete(request, response) {

    },
    processCreate(request, response) {

    },
    processUpdate(request, response) {

    },
    processDelete(request, response) {

    }

}
