import request from 'supertest';
import app from '../app';
import interventions from '../incidents.json';

describe('Intervention REST API end points unit test', () => {
  describe('get/all intervention posts', () => {
    it('should get interventions and return status (200) and intervention json objects', (done) => {
      request(app)
        .get('/api/v1/interventions')
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.data.length).toBeGreaterThanOrEqual(1);
          done();
        });
    });
  });

  describe('get/a intervention post', () => {
    it('should get a single intervention using a unique id to return a json object', (done) => {
      request(app)
        .get('/api/v1/interventions/1')
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.data.id).toEqual(1);
          done();
        });
    });

    it('it should return an error meessage, if the interventionId does not exist', (done) => {
      request(app)
        .get('/api/v1/interventions/2000')
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.error).toContain('the intervention with the id: 2000 does not exist');
          done();
        });
    });
  });

  describe('patch/a intervention post location', () => {
    it('should check if status is rejected', (done) => {
      request(app)
        .patch('/api/v1/interventions/1/location')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toContain('the intervention with the id: 1 does not adhere to iReports code of conduct hence has been rejected');
          done();
        });
    });

    it('should check if status is under investigation', (done) => {
      request(app)
        .patch('/api/v1/interventions/2/location')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toContain('the intervention with the id: 2 is under investigation');
          done();
        });
    });

    it('should check if status is resolved', (done) => {
      request(app)
        .patch('/api/v1/interventions/3/location')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toContain('the intervention with the id: 3 has been resolved');
          done();
        });
    });

    it('should patch locations if conditions are met', (done) => {
      request(app)
        .patch('/api/v1/interventions/4/location')
        .send({ location: 'new location' })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.data[0].message).toContain('new location');
          done();
        });
    });
  });

  describe('patch/a intervention post comment', () => {
    it('should check if status is rejected', (done) => {
      request(app)
        .patch('/api/v1/interventions/1/comment')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toContain('the intervention with the id: 1 does not adhere to iReports code of conduct hence has been rejected');
          done();
        });
    });

    it('should check if status is under investigation', (done) => {
      request(app)
        .patch('/api/v1/interventions/2/comment')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toContain('the intervention with the id: 2 is under investigation');
          done();
        });
    });

    it('should check if status is resolved', (done) => {
      request(app)
        .patch('/api/v1/interventions/3/location')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toContain('the intervention with the id: 3 has been resolved');
          done();
        });
    });

    it('should patch comment if conditions are met', (done) => {
      request(app)
        .patch('/api/v1/interventions/4/comment')
        .send({ comment: 'new comment' })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.data[0].message).toEqual('new comment');
          done();
        });
    });
  });

  describe('post/create a intervention post', () => {
    it('should get interventions and return status (200) and intervention json objects', (done) => {
      const newintervention = {
        createdOn: '01/06/2018',
        createdBy: 1,
        type: 'intervention',
        location: '6.465422, 3.406448',
        images: [
          'image',
          'image',
        ],
        videos: [
          'image',
          'image',
        ],
        comment: 'the people of yaba local Governement have not been paid salary the whole of this year, this is unfair to those involved and I plead that questions should be asked and this workers be paid.',
      };

      request(app)
        .post('/api/v1/interventions')
        .send(newintervention)
        .end((err, res) => {
          expect(res.status).toEqual(201);
          expect(res.body.message).toEqual('created intervention record');
          done();
        });
    });

    it('should check if user exist', (done) => {
      const newintervention = {
        createdOn: '01/06/2018',
        createdBy: 10000,
        type: 'intervention',
        location: '6.465422, 3.406448',
        images: [
          'image',
          'image',
        ],
        videos: [
          'image',
          'image',
        ],
        comment: 'the people of yaba local Governement have not been paid salary the whole of this year, this is unfair to those involved and I plead that questions should be asked and this workers be paid.',
      };

      request(app)
        .post('/api/v1/interventions')
        .send(newintervention)
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toContain('User not authorized');
          done();
        });
    });
  });

  describe('delete/all intervention posts', () => {
    it('should check if status is rejected', (done) => {
      request(app)
        .delete('/api/v1/interventions/1')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toContain('the intervention with the id: 1 does not adhere to iReports code of conduct hence has been rejected');
          done();
        });
    });

    it('should check if status is under investigation', (done) => {
      request(app)
        .delete('/api/v1/interventions/2')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toContain('the intervention with the id: 2 is under investigation');
          done();
        });
    });

    it('should check if status is resolved', (done) => {
      request(app)
        .delete('/api/v1/interventions/3')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toContain('the intervention with the id: 3 has been resolved');
          done();
        });
    });

    it('should delete intervention if all conditions are met', (done) => {
      const lastinterventionId = interventions[interventions.length - 1].id;

      request(app)
        .delete(`/api/v1/interventions/${lastinterventionId}`)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.data[0].message).toEqual('intervention succesfully deleted');
          done();
        });
    });

    it('should send an error if intervention does not exist', (done) => {
      request(app)
        .delete('/api/v1/interventions/1000')
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.error).toContain('the intervention with the id: 1000 does not exist');
          done();
        });
    });
  });
});
