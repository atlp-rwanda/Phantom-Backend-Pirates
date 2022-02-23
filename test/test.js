const chai = require('chai');
const chaiHTTP = require('chai-http');
const { app } = require('../src/app');

chai.should();
chai.use(chaiHTTP);

describe('server connection', () => {
  describe('server connected', () => {
    it('welcomes user to the api in english/default', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('Home page should have Welcome text', (done) => {
      chai
        .request(app)
        .get('/?lng=fr')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.equal('Bienvenue sur le Web fantôme');
          res.body.error.should.be.equal(false);
          done();
        });
    });

    it('welcomes user to the api in Kinyarwanda', (done) => {
      chai
        .request(app)
        .get('/?lng=rw')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.message.should.be.equal("Ikaze k'Urubuga rwa Phantom")
          res.body.error.should.be.equal(false)
          done()
        })
    })
  });
});