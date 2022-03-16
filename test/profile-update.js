const chai = require('chai')
const chaiHTTP = require('chai-http')
const { response } = require('express')
const { app } = require('../src/app')

chai.should()
chai.use(chaiHTTP)

describe('profile-updateAPI', () => {
    it('it should GET all the profiles', (done) => {
        chai.request(app)
            .get('/profiles')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array')
              done();
            });
      });
      it("it should GET a single profile by ID", (done) => {
        const id = 2;
        chai.request(app)
        .get("/profiles/"+id)
        .end((err, response) => {
          response.should.have.status(200);
        done()
      })
  })
     
})