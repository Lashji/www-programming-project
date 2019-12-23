/* eslint-disable no-console */
'use strict';

require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('config');
const expect = chai.expect;
chai.use(chaiHttp);

const http = require('http');

const app = require('../../app.js');
const Questionnaire = require("../../models/questionnaire")

const admin = config.get('admin');

const createUrl = '/questionnaires/new/';
// const readUrl = '/questionnaires/';
// const deleteUrl = '/questionnaires/edit/';
// const updateUrl = '/questionnaires/delete';

describe('Game: A+ protocol', function () {

    let request;

    beforeEach(async () => {

        try {
            // Remove all questionnaires from database
            // await Questionnaire.deleteMany({})
            let payload = {
                title: 'test title',
                submissions: 1,
                questions: [{

                    title: "question1",
                    maxPoints: 2,
                    options: [{
                        option: "yes",
                        hint: "",
                        correctness: true
                    },
                    {
                        option: "no",
                        hint: "",
                        correctness: false
                    }
                    ]
                }]
            }
            // Some dummy data commented out for future use if needed
            const questionnaire = new Questionnaire(payload)
            await questionnaire.save()

        } catch (e) {
            console.log(e)
            throw e
        }

    });

    describe('/new', () => {
        let payload

        beforeEach(function () {
            request = chai.request.agent(app);
            payload = {
                title: 'test title 2',
                submissions: 1,
                questions: [{

                    title: "question2",
                    maxPoints: 2,
                    options: [{
                        option: "no",
                        hint: "",
                        correctness: true
                    },
                    {
                        option: "yes",
                        hint: "",
                        correctness: false
                    }
                    ]
                }]
            }

            // console.log("before each payload => ", payload)
        });

        afterEach(function () {
            request.close();
        });


        it("Should create new questionnaire to the database", async () => {
            const response = await request
                .post(createUrl)
                .type('form')
                .send(payload)
            // expect(response).to.redirectTo(/\/questionnaires\/$/)

            //console.log("test payload=> ", payload)
            const questionnaire = await Questionnaire.findOne({
                title: "test title"
            }).exec()


            //console.log("questionnaire test => ", questionnaire)

            expect(questionnaire).to.exist

        })
    })

    describe('/del', () => {
        let payload

        beforeEach(function () {
            request = chai.request.agent(app);
            payload = {
                title: 'test title 3',
                submissions: 1,
                questions: [{

                    title: "question2",
                    maxPoints: 2,
                    options: [{
                        option: "no",
                        hint: "",
                        correctness: true
                    },
                    {
                        option: "yes",
                        hint: "",
                        correctness: false
                    }
                    ]
                }]
            }
            //console.log("before each payload => ", payload)
        });

        afterEach(function () {
            request.close();
        });


        it("Should delete questionnaire from the database", async () => {
            const response = await request
                .delete(deleteUrl)
                .type('form')
                .send(payload)
            // expect(response).to.redirectTo(/\/questionnaires\/$/)

            //console.log("test payload=> ", payload)
            const questionnaire = await Questionnaire.findOne({
                title: "test title"
            }).exec()


            //console.log("questionnaire test => ", questionnaire)

            expect(questionnaire).not.to.exist

        })
    })

});
