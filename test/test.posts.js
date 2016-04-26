process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../db/knex');
const app = require('../app');


describe('GET /posts', () => {
  it('responds with JSON', done => {
    request(app)
      .get('/posts')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('returns an array of all posts when responding with JSON', done => {
    request(app)
      .get('/posts')
      .end((err, res) => {
        expect(res.body).to.deep.equal([{
          id: 1000,
          user_id: 2001, 
          title: "Why I'm so down to Earth and likeable", 
          body: "I don't really know, I just try to stay grounded and, like, keep it real even though I've had so much success!"
        }]);
        done();
      });
  });
});