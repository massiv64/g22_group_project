process.env.NODE_ENV = 'test';

var request = require('supertest');
var server = request.agent('http://localhost:3000');

const expect = require('chai').expect;
const knex = require('../db/knex');
const app = require('../app');
//
// beforeEach(done => {
//   return Promise.all([
//     knex('users').insert({id: 1, alias: 'Kyle', photo: 'https://lh3.googleusercontent.com/-2QhW5XtO_ug/AAAAAAAAAAI/AAAAAAAACNQ/C21RIn86YkA/photo.jpg', email:"test@foo.bar", password:"gibberish"}),
//   ]).then(() => done());
// });
//
// afterEach(done =>{
//   knex('users').del().then(()=> done());
// });

describe('GET /', function(){
  it("it should direct users with no session to login", function(done){
    request(app)
      .get('/')
      .expect(400)
      .end((err, res) =>{
        expect(res.text).to.contain("Redirecting to auth/login");
        done();
      })
  })
})

describe('GET /users', function(){
  it("it should direct users with no session to login", function(done){
    request(app)
      .get('/users')
      .expect(400)
      .end((err, res) =>{
        expect(res.text).to.contain("Redirecting to auth/login");
        done();
      })
  })
})



describe('GET /auth/login', function(){
  it("should be happy", function(done){
    request(app)
      .get('/auth/login')
      .expect(200)
      .end((err, res) =>{
        expect(res.text).to.contain("Click here to sign up");
        done();
      })
  })
})
