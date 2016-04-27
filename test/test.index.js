process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../db/knex');
const app = require('../app');


beforeEach(done => {
  console.log('beforeEach')
  done();
})

afterEach(done =>{
  console.log('afterEach')
  done();
})
  //any test in the before
    //some users posts, comments, categories,
    //expect all of those componest 
    //body of html
    //all routes return html
        //and continue running
        //check pages are going their task. 
  
  // return Promise.all([
  //   knex('users').insert({id: 1, photo:'https://goo.gl/ISKmPE' , email: 'laurag@test.com', alias: 'Laura'})


  // ])

  describe('GET /account', () => {
    it ('responds with HTML', done =>{
      request(app)
      //need to figure out how to apply to all of our valide routes
        .get('/account') 
        .expect('Content-Type', /html/)
        .expect(200,done);
    });

  });
















// afterEach(done =>  done());