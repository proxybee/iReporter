import server from "supertest"; //to test server
import app from "../server";
import fs from 'fs';
import redFlags from '../server/incidents.json';
import { getAllRedFlags } from "../server/controllers/red-flag-controller";
import { getRedFlag } from "../server/controllers/red-flag-controller";

describe('Red flag REST API end points unit test', () => {

    describe('get/all red-flag posts', () => {
        beforeAll((done) => {
            server(app)
                .get('/api/v1/red-flags')
                .expect('Content-Type', /json/)
            done()
        });
        it('should get red flags and return status (200) and redFlag json objects', () => {
            expect(getAllRedFlags).toContain({
                status: 200,
                data: redFlags
            });
            // expect(res.body.status).toContain(200);
            // expect(res.body.data).toContain(redFlags);
        });
        it('should return error if json array is empty', () => {
            expect(redFlags.length = 0).toContain({
                status: 500,
                error: "ooops! we seem to have missed redFlags, we will fix this as soon as possible"
            });
            // expect(res.body.status).toBe(500);
            // expect(res.body.error).toContain("ooops! we seem to have missed redFlags, we will fix this as soon as possible");
        });
    });

    describe('get/a red-flag post', () => {
        beforeAll((done) => {
            server(app)
                .get('/api/v1/red-flag/:redFlagId')
                .expect('Content-Type', /json/)
            done()
        });
        it('should get a single red flag using a unique id to return a json object', () => {
            expect(getRedFlag).toContain({
                status: 200,
                data: redFlag
            });
            // expect(res.body.status).toContain(200);
            // expect(res.body.data).toContain(redFlags);
        });
        it('if red flag id does not exist', () => {
            const redFlagId = 1
            expect(!redFlagId).toContain({
                status: 400,
                error: "the red-flag with the id:" + redFlagId + "does not exist"
            });
            // expect(res.body.status).toBe(500);
            // expect(res.body.error).toContain("ooops! we seem to have missed redFlags, we will fix this as soon as possible");
        });
    });



});


