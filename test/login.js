const chai = require('chai')
const chaiHttp = require('chai-http')
const { app } = require('../src/app')

chai.should()
chai.use(chaiHttp)

describe('Login API', () => {
  // Testing login end-point
  describe('/users/login', () => {
    it('A registered user should be able to login', (done) => {
      const user = {
        email:"jane@gmail.com",
        password:"123456"
      }
      chai
        .request(app)
        .post('/users/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.message.should.be.equal('Operator successfully logged in')
          done()
        })
    })
    it('A non-registered user shouldnot be able to login', (done) => {
      const user = {
        email:"nijohn@gmail.com",
        password:"holdon"
      }
      chai
        .request(app)
        .post('/users/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.error.should.be.equal('The email is not registered! Please first register')
          done()
        })
    })
    it('A registered user with wrong password logins shouldnot be able to login', (done) => {
      const user = {
        email:"jane@gmail.com",
        password:"holdon"
      }
      chai
        .request(app)
        .post('/users/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401)
          res.body.error.should.be.equal("The passwords entered don't match")
          done()
        })
    })
  })
})
