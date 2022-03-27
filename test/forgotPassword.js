const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../src/app');

chai.should();
chai.use(chaiHttp);

describe('Forgot password API', () => {
  // Testing forgot password end-point
  describe('/forgotpassword', () => {
    // tests for a registered email
    it('A registered email should be able to reset password/default language', (done) => {
      const user = {
        email:"jane@gmail.com",
      }
      chai
        .request(app)
        .post('/forgotpassword')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.message.should.be.equal('Check your email for the reset link')
          done()
        })
    })
    it('A registered email should be able to reset password/French language', (done) => {
        const user = {
          email:"jane@gmail.com",
        }
        chai
          .request(app)
          .post('/forgotpassword/?lng=fr')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.message.should.be.equal('Vérifiez votre e-mail pour le lien de réinitialisation')
            done()
          })
      })
      it('A registered email should be able to reset password/Kinyarwanda language', (done) => {
        const user = {
          email:"jane@gmail.com",
        }
        chai
          .request(app)
          .post('/forgotpassword/?lng=rw')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.message.should.be.equal('Reba muri imeri yawe kugirango uhindure ijambobanga ryawe')
            done()
          })
      })
      // Tests for a non-registered email
      it('A non-registered email should not be able to reset password/default language', (done) => {
        const user = {
          email:"nijohn@gmail.com",
        }
        chai
          .request(app)
          .post('/forgotpassword')
          .send(user)
          .end((err, res) => {
            res.should.have.status(400)
            res.body.message.should.be.equal('The user with the email does not exist')
            done()
          })
      })
      it('A non-registered email should not be able to reset password/French language', (done) => {
          const user = {
            email:"nijohn@gmail.com",
          }
          chai
            .request(app)
            .post('/forgotpassword/?lng=fr')
            .send(user)
            .end((err, res) => {
              res.should.have.status(400)
              res.body.message.should.be.equal("L'utilisateur avec l'email n'existe pas")
              done()
            })
        })
        it('A non-registered email should not be able to reset password/Kinyarwanda language', (done) => {
          const user = {
            email:"nijohn@gmail.com",
          }
          chai
            .request(app)
            .post('/forgotpassword/?lng=rw')
            .send(user)
            .end((err, res) => {
              res.should.have.status(400)
              res.body.message.should.be.equal('Umukoresha ufite iyo imeri ntabwo abaho')
              done()
            })
        })

  })
})
