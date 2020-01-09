import request from 'supertest';
import app from '../app';
import redFlags from '../incidents.json';

describe('Red flag REST API end points unit test', () => {
  describe('get/all red-flag posts', () => {
    it('should get red flags and return status (200) and redFlag json objects', (done) => {
      request(app)
        .get('/api/v1/red-flags')
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.data.length).toBeGreaterThanOrEqual(1);
          done();
        });
    });
  });

  describe('get/a red-flag post', () => {
    it('should get a single red flag using a unique id to return a json object', (done) => {
      request(app)
        .get('/api/v1/red-flags/1')
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.data.id).toEqual(1);
          done();
        });
    });

    it('it should return an error meessage, if the redFlagId does not exist', (done) => {
      request(app)
        .get('/api/v1/red-flags/2000')
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.error).toContain('the red-flag with the id: 2000 does not exist');
          done();
        });
    });
  });

  describe('patch/a red-flag post location', () => {
    it('should check if status is rejected', (done) => {
      request(app)
        .patch('/api/v1/red-flags/1/location')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toContain('the red-flag with the id: 1 does not adhere to iReports code of conduct hence has been rejected');
          done();
        });
    });

    it('should check if status is under investigation', (done) => {
      request(app)
        .patch('/api/v1/red-flags/2/location')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toContain('the red-flag with the id: 2 is under investigation');
          done();
        });
    });

    it('should check if status is resolved', (done) => {
      request(app)
        .patch('/api/v1/red-flags/3/location')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toContain('the red-flag with the id: 3 has been resolved');
          done();
        });
    });

    it('should patch locations if conditions are met', (done) => {
      request(app)
        .patch('/api/v1/red-flags/4/location')
        .send({ location: 'new location' })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.data[0].message).toContain('new location');
          done();
        });
    });
  });

  describe('patch/a red-flag post comment', () => {
    it('should check if status is rejected', (done) => {
      request(app)
        .patch('/api/v1/red-flags/1/comment')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toContain('the red-flag with the id: 1 does not adhere to iReports code of conduct hence has been rejected');
          done();
        });
    });

    it('should check if status is under investigation', (done) => {
      request(app)
        .patch('/api/v1/red-flags/2/comment')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toContain('the red-flag with the id: 2 is under investigation');
          done();
        });
    });

    it('should check if status is resolved', (done) => {
      request(app)
        .patch('/api/v1/red-flags/3/location')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toContain('the red-flag with the id: 3 has been resolved');
          done();
        });
    });

    it('should patch comment if conditions are met', (done) => {
      request(app)
        .patch('/api/v1/red-flags/4/comment')
        .send({ comment: 'new comment' })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.data[0].message).toEqual('new comment');
          done();
        });
    });
  });

  describe('post/create a red-flag post', () => {
    it('should get red flags and return status (200) and redFlag json objects', (done) => {
      const newRedFlag = {
        createdOn: '01/06/2018',
        createdBy: 1,
        type: 'red-flag',
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
        .post('/api/v1/red-flags')
        .send(newRedFlag)
        .end((err, res) => {
          expect(res.status).toEqual(201);
          expect(res.body.message).toEqual('created red flag record');
          done();
        });
    });

    it('should check if user exist', (done) => {
      const newRedFlag = {
        createdOn: '01/06/2018',
        createdBy: 10000,
        type: 'red-flag',
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
        .post('/api/v1/red-flags')
        .send(newRedFlag)
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toContain('User not authorized');
          done();
        });
    });
  });

  describe('delete/all red-flag posts', () => {
    it('should check if status is rejected', (done) => {
      request(app)
        .delete('/api/v1/red-flags/1')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toContain('the red-flag with the id: 1 does not adhere to iReports code of conduct hence has been rejected');
          done();
        });
    });

    it('should check if status is under investigation', (done) => {
      request(app)
        .delete('/api/v1/red-flags/2')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toContain('the red-flag with the id: 2 is under investigation');
          done();
        });
    });

    it('should check if status is resolved', (done) => {
      request(app)
        .delete('/api/v1/red-flags/3')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toContain('the red-flag with the id: 3 has been resolved');
          done();
        });
    });

    it('should delete red flag if all conditions are met', (done) => {
      const lastRedFlagId = redFlags[redFlags.length - 1].id;

      request(app)
        .delete(`/api/v1/red-flags/${lastRedFlagId}`)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.data[0].message).toEqual('red flag succesfully deleted');
          done();
        });
    });

    it('should send an error if red flag does not exist', (done) => {
      request(app)
        .delete('/api/v1/red-flags/1000')
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.error).toContain('the red-flag with the id: 1000 does not exist');
          done();
        });
    });
  });
});
