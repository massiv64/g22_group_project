const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');

describe('GET /', () => {
  it('responds', done => {
    request(app)
      .get('/users')
      .expect(200, done);
  });
});

describe('GET /users', () => {
  it('responds with JSON', done => {
    request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /users/:id', () => {

  it('responds with a user profile', done => {
    request(app)
      .get('/sloths/1')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
