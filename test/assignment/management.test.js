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

const admin = config.get('admin');

const createUrl = '/questionnaires/new';
const loginUrl = '/users/login';
const readUrl = '/questionnaires';
const deleteUrl = '/questionnaires/edit';
const updateUrl = '/questionnaires/delete';

describe('Game: A+ protocol', function() {
    let request;
    const user = {...admin};

    const {email, password} = user;
    beforeEach(async () => {
        request = chai.request.agent(app);


        // loginRes = await request
        //     .post(loginUrl)
        //     .type('form')
        //     .send({email, password});


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

    });

    // describe('/new', () => {
    //     let payload;

    //     beforeEach(function() {
    //         request = chai.request.agent(app);

    //         payload = {
    //             title: 'test title 2',
    //             questions: [
    //                 {
    //                     title: 'question2',
    //                     maxPoints: 2,
    //                     options: [
    //                         {
    //                             option: 'no',
    //                             hint: '',
    //                             correctness: true
    //                         },
    //                         {
    //                             option: 'yes',
    //                             hint: '',
    //                             correctness: false
    //                         }
    //                     ]
    //                 }
    //             ]
    //         };
    //     });


    //     it('Should create new questionnaire to the database', async () => {

    //         const allQ = await Questionnaire.find();
    //         console.log('All questions =', allQ);
    //         console.log('USER => ', user);


    //         const res =  await request
    //             .post(createUrl)
    //             .type('form')
    //             .send(payload)
    //             .then(async ()=> {
    //                 const questionnaire = await Questionnaire.findOne({
    //                     title: 'test title 2'
    //                 }).exec();
    //                 expect(questionnaire).to.exist;
    //                 expect(questionnaire.title).to.equal('test title 2');

    //             });
    //         console.log('test payload=> ', payload);


    //         console.log('questionnaire test => ', questionnaire);

    //     });
    // });

    afterEach(async function() {
        request.close();
    });
});

