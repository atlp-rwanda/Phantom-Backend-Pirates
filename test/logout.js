const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../src/app');

chai.should();
chai.use(chaiHttp);

describe('Logout API', () => {
  // Testing logout end-point
  describe('/users/logout', () => {
    it('An authenticated user should be able to logout/default language', (done) => {
      chai
        .request(app)
        .get('/users/logout')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.message.should.be.equal('Successfully logged out of your Account')
          done()
        })
    })
    it('An authenticated user should be able to logout/Kinyarwanda Language', (done) => {
      chai
        .request(app)
        .get('/users/logout/?lng=rw')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.message.should.be.equal('Ubashize gusohoka muri Konti yawe neza')
          done()
        })
    })
    it('An authenticated user should be able to logout/French Language', (done) => {
      chai
        .request(app)
        .get('/users/logout/?lng=fr')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.message.should.be.equal("Déconnexion réussie de votre compte")
          done()
        })
    })   
  })
})