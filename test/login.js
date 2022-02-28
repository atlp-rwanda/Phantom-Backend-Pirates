const chai = require('chai')
const chaiHttp = require('chai-http')
const { app } = require('../src/app')

chai.should()
chai.use(chaiHttp)

describe('Login API', () => {
  // Testing login end-point
  describe('/users/login', () => {
    it('It should allow an authenticated user to login', (done) => {
      chai
        .request(app)
        .get('/users/login')
        .end((err, res) => {
          res.should.have.status(200)
          
          done()
        })
    })
  })
})
