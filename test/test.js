const chai = require('chai');
const chaiHTTP = require('chai-http');
const app = require('../src/app').default;

chai.should();
chai.use(chaiHTTP);

describe('server connection', () => {
  describe('server connected', () => {
    it('it Should show return an html page', (done) => {
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
        .get('/')
        .end((err, res) => {
          res.text.should.be.equal('<h1>Welcome to Phantom Web App!!!!!</h1>');
          done();
        });
    });
  });
});
