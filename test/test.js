const chai = require('chai')
const chaiHTTP = require('chai-http')
const { app } = require('../src/app')

chai.should()
chai.use(chaiHTTP)

describe('server connection', () => {
  describe('server connected', () => {
    it('it Should show return an html page', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
    it('Home page should have Welcome text', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          res.text.should.be.equal('<h1>Welcome to Phantom Web App!!!!!</h1>')
          done()
        })
    });
    it('it Should show return all comapny', (done) => {
      chai
        .request(app)
        .get('/api/company')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
    it('it Should show Not return all company', (done) => {
      chai
        .request(app)
        .get('/api/companys')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('It should get a particular one company by ID', (done) => {
      const id = 6;
      chai
        .request(app)
        .get(`/api/company/${id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('It should not retrieve  a particular company when id dont exist', (done) => {
      const id = 51;
      chai
        .request(app)
        .get(`/api/company/${id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eq('Company not found');
          done();
        });
    });


  })
})
