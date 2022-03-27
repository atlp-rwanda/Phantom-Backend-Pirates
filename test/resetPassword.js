const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../src/app');
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
import { Employee } from '../models'

dotenv.config()

chai.should();
chai.use(chaiHttp);

describe('Reset password API', () => {
  // Testing forgot password end-point
  describe('/reset/:token', () => {
    // tests for a registered email
    it('A user can reset password/default language', (done) => {
      const email = Employee.findOne({
        where: {
          email
        }
      })
      const token = jwt.sign({ email: email }, process.env.RESET_SECRET, { expiresIn: process.env.RESET_TOKEN_EXPIRES })
      const user = {
        email:"jane@gmail.com",
        password: "123456",
        passwordConfirm: "123456"
      }
      chai
        .request(app)
        .post('/reset/'+token)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.message.should.be.equal('Password reset successfully')
          done()
        })
    })
    it('A user can reset password/French language', (done) => {
      const email = Employee.findOne({
        where: {
          email
        }
      })
      const token = jwt.sign({ email: email }, process.env.RESET_SECRET, { expiresIn: process.env.RESET_TOKEN_EXPIRES })
      const user = {
        email:"jane@gmail.com",
        password: "123456",
        passwordConfirm: "123456"
      }
        chai
          .request(app)
          .post('/reset/'+token+'/?lng=fr')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.message.should.be.equal('Mot de passe réinitialisé avec succès')
            done()
          })
      })
      it('A user can reset password/Kinyarwanda language', (done) => {
        const email = Employee.findOne({
          where: {
            email
          }
        })
        const token = jwt.sign({ email: email }, process.env.RESET_SECRET, { expiresIn: process.env.RESET_TOKEN_EXPIRES })
        const user = {
          email:"jane@gmail.com",
          password: "123456",
          passwordConfirm: "123456"
        }
        chai
          .request(app)
          .post('/reset/'+token+'/?lng=rw')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.message.should.be.equal('Guhindurirwa ijambo ryibanga byagenze neza')
            done()
          })
      })
  })
})
