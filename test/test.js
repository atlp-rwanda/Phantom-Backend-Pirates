const chai = require('chai')
const chaiHTTP = require('chai-http')
const { app } = require('../src/app')
<<<<<<< HEAD
<<<<<<< HEAD
const expect = chai.expect()
=======
>>>>>>> husky trial 3
=======
>>>>>>> 996f2a9754ca1ef0bfc0f4e001e44b19589da413

chai.should()
chai.use(chaiHTTP)

describe('server connection', () => {
  describe('server connected', () => {
    
    it('welcomes user to the api in english/default', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
<<<<<<< HEAD
<<<<<<< HEAD
          res.should.have.status(200);
          res.body.message.should.be.equal('Welcome to Phantom Web');
          res.body.error.should.be.equal(false);
          done();
        });
    });

    it('welcomes user to the api in french', (done) => {
=======
=======
>>>>>>> 996f2a9754ca1ef0bfc0f4e001e44b19589da413
          res.should.have.status(200)
          done()
        })
    })
    it('Home page should have Welcome text', (done) => {
>>>>>>> husky trial 3
      chai
        .request(app)
        .get('/?lng=fr')
        .end((err, res) => {
<<<<<<< HEAD
<<<<<<< HEAD
          res.should.have.status(200);
          res.body.message.should.be.equal('Bienvenue sur le Web de Phantom');
          res.body.error.should.be.equal(false);

          done();
        });
    });

    it('welcomes user to the api in Kinyarwanda', (done) => {
      chai
        .request(app)
        .get('/?lng=rw')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.equal("Ikaze k'Urubuga rwa Phantom");
          res.body.error.should.be.equal(false);
          done();
        });
    });

    it('404 Error', (done) => {
      chai
        .request(app)
        .get('/random')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });






  });
});
=======
=======
>>>>>>> 996f2a9754ca1ef0bfc0f4e001e44b19589da413
          res.text.should.be.equal('<h1>Welcome to Phantom Web App!!!!!</h1>')
          done()
        })
    })
  })
})
<<<<<<< HEAD
>>>>>>> husky trial 3
=======
>>>>>>> 996f2a9754ca1ef0bfc0f4e001e44b19589da413
