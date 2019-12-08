"use strict"

const Questionnaire = require('../models/questionnaire');
module.exports = {

    /**
     * Returns list of users
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    async list(request, response) {
        const questionnaires = await Questionnaire.find()
            .sort('title')
            .exec()
        console.log("listing", questionnaires)
        response.render("questionnaire/list_questionnaires", {
            questionnaires
        })
    },
    async show(request, response) {

    },
    async create(request, response) {
        console.log("rendering create")
        response.render("questionnaire/create_questionnaire")
    },
    async update(request, response) {
        console.log("rendering edit")
        response.render("questionnaire/edit_questionnaire")
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
