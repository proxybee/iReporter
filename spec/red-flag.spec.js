// import server from "supertest";
// import app from "../server";
// import fs from "fs";
// import redFlags from "../server/incidents.json";
// import { getAllRedFlags } from "../server/controllers/red-flag-controller";
// import { getRedFlag } from "../server/controllers/red-flag-controller";

// describe('Red flag REST API end points unit test', () => {

//     describe('get/all red-flag posts', () => {
//         beforeAll((done) => {
//             server(app)
//                 .get('/api/v1/red-flags')
//                 .expect('Content-Type', /json/)
//             done()
//         });
//         it('should get red flags and return status (200) and redFlag json objects', () => {
//             expect(getAllRedFlags).toContain({
//                 status: 200,
//                 data: redFlags
//             });
//             // expect(res.body.status).toContain(200);
//             // expect(res.body.data).toContain(redFlags);
//         });
//         it('should return error if json array is empty', () => {
//             expect(redFlags.length = 0).toContain({
//                 status: 500,
//                 error: "ooops! we seem to have missed redFlags, we will fix this as soon as possible"
//             });
//             // expect(res.body.status).toBe(500);
//             // expect(res.body.error).toContain("ooops! we seem to have missed redFlags, we will fix this as soon as possible");
//         });
//     });

//     describe('get/a red-flag post', () => {
//         beforeAll((done) => {
//             server(app)
//                 .get('/api/v1/red-flag/:redFlagId')
//                 .expect('Content-Type', /json/)
//             done()
//         });
//         it('should get a single red flag using a unique id to return a json object', () => {
//             expect(getRedFlag).toContain({
//                 status: 200,
//                 data: redFlag
//             });
//             // expect(res.body.status).toContain(200);
//             // expect(res.body.data).toContain(redFlags);
//         });
//         it('if red flag id does not exist', () => {
//             const redFlagId = 1
//             expect(!redFlagId).toContain({
//                 status: 400,
//                 error: "the red-flag with the id:" + redFlagId + "does not exist"
//             });
//             // expect(res.body.status).toBe(500);
//             // expect(res.body.error).toContain("ooops! we seem to have missed redFlags, we will fix this as soon as possible");
//         });
//     });

// });




import request from 'supertest';
import app from '../server';
import redFlags from '../server/incidents.json';
import { getRedFlag, getAllRedFlags } from '../server/controllers/red-flag-controller';

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
        let respData = {}
        const application = request(app)
        // beforeAll(() => {
        //     const application = request(app)
        //     // request(app)
        //     //     .get('/api/v1/red-flags')
        //     //     .expect(200)
        //     //     .then(response => {
        //     //         respData.status = response.status;
        //     //         respData.data = response.body.data
        //     //         done()
        //     //     })
            
        //     // request(app).get().expect().then()

        // });
        it('should get red flags and return status (200) and redFlag json objects', (done) => {
            application
            .get('/api/v1/red-flags')
            .expect(200)
            .then(response => {
                respData.status = response.status;
                respData.data = response.body.data

                expect(respData.status).toBe(200);
                expect(respData.data[0]).toEqual(jasmine.objectContaining({
                    'comment': "the people of yaba local Governement have not been paid salary the whole of this year, this is unfair to those involved and I plead that questions should be asked and this workers be paid."
                }))

                done()
            })
        });

        it('should return error if json array is empty', () => {
            redFlags = []

            application
            .get('/api/v1/red-flags')
            .expect(200)
            .then(response => {
                expect(response.status).toBe(204)
                expect(response.body.data).toEqual([])
                expect(response.error).toContain("Ooops! Currently no redflags")
            })

            // expect(redFlags.length = 0).toContain({
            //     status: 500,
            //     error: "ooops! we seem to have missed redFlags, we will fix this as soon as possible"
            // });
            // expect(res.body.status).toBe(500);
            // expect(res.body.error).toContain("ooops! we seem to have missed redFlags, we will fix this as soon as possible");
        });
    });

    // describe('get/a red-flag post', () => {
    //     beforeAll((done) => {
    //         request(app)
    //             .get('/api/v1/red-flag/:redFlagId')
    //             .expect('Content-Type', /json/)
    //         done()
    //     });
    //     it('should get a single red flag using a unique id to return a json object', () => {
    //         expect(getRedFlag).toContain({
    //             status: 200,
    //             data: redFlag
    //         });
    //         // expect(res.body.status).toContain(200);
    //         // expect(res.body.data).toContain(redFlags);
    //     });
    //     it('if red flag id does not exist', () => {
    //         const redFlagId = 1
    //         expect(!redFlagId).toContain({
    //             status: 400,
    //             error: "the red-flag with the id:" + redFlagId + "does not exist"
    //         });
    //         // expect(res.body.status).toBe(500);
    //         // expect(res.body.error).toContain("ooops! we seem to have missed redFlags, we will fix this as soon as possible");
    //     });
    // });

});

