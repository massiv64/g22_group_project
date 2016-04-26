process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../db/knex');
const app = require('../app');


describe('GET /', () => {
  it('responds', done => {
    request(app)
      .get('/users')
      .expect(200, done);
  });
});

describe('GET /login', () => {
  it('responds with JSON', done => {
    request(app)
      .get('/login')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /signup', () => {
  it('responds with JSON', done => {
    request(app)
      .get('/signup')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
