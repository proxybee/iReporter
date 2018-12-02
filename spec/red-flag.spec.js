import fs from 'fs';
import request from 'supertest';
import app from '../server';
import redFlags from '../server/incidents.json';

const testIncidents = [
    {
        "id": 1,
        "createdOn": "01/06/2018",
        "createdBy": "Teema",
        "type": "red-flag",
        "location": "6.465422, 3.406448",
        "status": "resolved",
        "images": [
            "image",
            "image"
        ],
        "videos": [
            "image",
            "image"
        ],
        "comment": "the people of yaba local Governement have not been paid salary the whole of this year, this is unfair to those involved and I plead that questions should be asked and this workers be paid."
    }
]


describe('Red flag REST API end points unit test', () => {
    describe('get/all red-flag posts', () => {

        it('should get red flags and return status (200) and redFlag json objects', (done) => {
            request(app)
                .get('/api/v1/red-flags')
                .expect(200)
                .then((res) => {
                    expect(res.status).toEqual(200);
                    expect(res.body.data).toEqual(redFlags);
                })
            done()
        });

    });

    it('should return error if red flags are empty', (done) => {
        request(app)
            .get('/api/v1/red-flags')
        if (redFlags.length = 0) {
            expect(200)
                .then((res) => {
                    expect(res.status).toEqual(204);
                    expect(res.body.error).toContain("Ooops! Currently no redflags");

                })
        }
        done()
    });

    describe('get/a red-flag post', () => {
        it('should get a single red flag using a unique id to return a json object', (done) => {
            request(app)
                .get('/api/v1/red-flags/1')
                .expect(200)
                .then((res) => {
                    expect(res.status).toEqual(200);
                    expect(res.body.data).toEqual(redFlags.find(flag => flag.id == 1));
                })
            done()
        });
        it('if the redFlagId does not exist', (done) => {
            request(app)
                .get('/api/v1/red-flags/20')
            if (!20) {
                expect(200)
                    .then((res) => {
                        expect(res.status).toEqual(404);
                        expect(res.body.error).toContain("the red-flag with the id: 20 does not exist");

                    })
            }
            done()

        });
    });


});


