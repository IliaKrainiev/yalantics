const app = require('../index');
const supertest = require('supertest');
const mongoose = require('mongoose');
const { connect } = require('../dbConfig');
const RequestLogs = require('../models/RequestLogs');
const UsersOnSite = require('../models/UsersOnSite');

const request = supertest(app);

describe('given index.js (router)', () => {
    beforeAll(async () => {
        connect();
    });

    afterAll(async () => {
       await mongoose.connection.close()
    });

    beforeEach(async () => {
        await RequestLogs.deleteMany();
        await UsersOnSite.deleteMany();
    });


    describe('send request on "/" route', () => {
        it('then API returns amountOfUsersOnSite', async done => {
            const newUsers = new UsersOnSite({ip: 'test'});
            await newUsers.save();

            request.get('/').end((err, res) => {

                expect(res.text).toEqual(       '{"amountOfUsersOnSite":2}');
                done();
            });
        });
    });

    describe('send request on "/logs" route', () => {
        it ('then API returns logs', async done => {
            const logs = new RequestLogs({ip: 'test', error: 'test'});
            await logs.save();

            request.get('/logs').end(async (err, res) => {

                expect(res.text).toEqual('{"logs":[{"_id":"5fbb01124a0a20f6422b3d50","ip":"test","error":"test","__v":0}]}');
                done();
            });
        });
    });
    describe('send request on "/distinct-by-ip" route', () => {
        it ('then API returns amountOfUsersOnSite with unique ips', async done => {
            const newUser1 = new UsersOnSite({ip: 'test'});
            await newUser1.save();

            const newUser2 = new UsersOnSite({ip: 'test'});
            await newUser2.save();


            request.get('/distinct-by-ip').end((err, res) => {

                expect(res.text).toEqual( "{\"amountOfUsersOnSiteDistinct\":2}");
                done();
            });
        });
    })
});
