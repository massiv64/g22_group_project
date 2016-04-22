const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');

describe('GET /users', () => {
  it('responds', done => {
    request(app)
      .get('/users')
      .expect(200, done);
  });
});
