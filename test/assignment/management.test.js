/* eslint-disable no-console */
'use strict';

require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('config');
const expect = chai.expect;
chai.use(chaiHttp);
const app = require('../../app.js');
const Questionnaire = require('../../models/questionnaire');
const User = require('../../models/user');

const admin = config.get('admin');

const createUrl = '/questionnaires/new';
const loginUrl = '/users/login';
const readUrl = '/questionnaires';
const deleteUrl = '/questionnaires/edit';
const updateUrl = '/questionnaires/delete';

describe('Game: A+ protocol', function() {
    let request;
    let userData;

    beforeEach(async () => {
        request = chai.request.agent(app);
        try {
            await User.deleteMany({});

            userData = { name: 'user',
                email: 'user@sposti.fi',
                password: '1234567890',
                passwordConfirmation: '1234567890',
                role: 'admin'};

            const user = new User(userData);
            await user.save();
            // const foundUser = await User.findById(user.id);
            // console.log('foundUser => ', foundUser);
        } catch (e){
            console.log(e);
            throw e;
        }

        try {
            // Remove all questionnaires from database
            await Questionnaire.deleteMany({});
            const sampleData = {
                title: 'test title',
                submissions: 1,
                questions: [
                    {
                        title: 'question1',
                        maxPoints: 2,
                        options: [
                            {
                                option: 'yes',
                                hint: '',
                                correctness: true
                            },
                            {
                                option: 'no',
                                hint: '',
                                correctness: false
                            }
                        ]
                    }
                ]
            };
            // Some dummy data commented out for future use if needed
            const questionnaire = new Questionnaire(sampleData);
            await questionnaire.save();
        } catch (e) {
            console.log(e);
            throw e;
        }
    });


    describe('/questionnaire/routes', () => {
        beforeEach(() => {
            request = chai.request.agent(app);
        });

        it('visiting /questionnaires/new', async () => {
            const res = await request
                .get('/questionnaires/new');
            expect(res).to.have.status(200);
            console.log('questionnaire test res => ', res.redirects);
        });
        it('visiting /questionnaires/', async () => {
            const res = await request
                .get('/questionnaires/');
            expect(res).to.have.status(200);
        });


        it('should accept login with correct credentials', async function() {
            const response = await request
                .post(loginUrl)
                .type('form')
                .send(userData);
            expect(response).to.have.cookie('bwa');
            expect(response).to.redirectTo(/\/$/);
        });


    });


    describe('/new', () => {
        let payload;
        let response;

        beforeEach(async function() {
            const { email, password } = userData;
            request = chai.request.agent(app);
            response = await request
                .post(loginUrl)
                .type('form')
                .send({ email, password });


            payload = {
                parsed: true,
                title: 'test title 2',
                questions: [
                    {
                        title: 'question2',
                        maxPoints: 2,
                        options: [
                            {
                                option: 'no',
                                hint: '',
                                correctness: true
                            },
                            {
                                option: 'yes',
                                hint: '',
                                correctness: false
                            }
                        ]
                    }
                ]
            };
        });


        it('Should create new questionnaire to the database', async () => {

            const res =  await request
                .post(createUrl)
                .type('form')
                .send(payload);
            const questionnaire = await Questionnaire.findOne({
                title: 'test title 2'
            }).exec()
                .then((questionnaire) => {
                    expect(questionnaire).to.exist;
                    expect(questionnaire.title).to.equal('test title 2');
                });


        });


        it('should not create questionnaire with faulty data', async () => {
            payload.title = '';

            const res = await request
                .post(createUrl)
                .type('form')
                .send(payload);

            const questionaire = await Questionnaire.findOne({title: payload.title}).exec()
                .then((questionnaire) => {
                    expect(questionnaire).to.not.exist;
                });

        });


        it('should not create questionnaire with duplicate title', async () => {
            payload.title = 'test title';

            const res = await request
                .post(createUrl)
                .type('form')
                .send(payload);


            const questionaire = await Questionnaire.find({title: payload.title}).exec()
                .then((questionnaire) => {
                    console.log('Questionnaire duplicate title ', questionnaire);
                    expect(questionnaire).to.have.lengthOf(1);
                });
        });

        it('should not create questionnaire without atleast one correct answer', async () => {

            payload.questions[0].options[0].correctness = false;

            const res = await request
                .post(createUrl)
                .type('form')
                .send(payload);

            const questionaire = await Questionnaire.findOne({title: payload.title}).exec()
                .then((questionnaire) => {
                    expect(questionnaire).to.not.exist;
                });

        });


        afterEach(async function() {
            request.close();
        });
    });


});

