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
        const questionnaire = await Questionnaire.findById(request.params.id)
        console.log("questionnaire = ", questionnaire.id)
        response.render("questionnaire/view_questionnaire", {
            questionnaire
        })
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
        console.log("procesCreate = ", request.body)
    },
    processUpdate(request, response) {

    },
    processDelete(request, response) {

    }

}
