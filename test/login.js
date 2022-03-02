const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../src/app');

chai.should();
chai.use(chaiHttp);

describe('Login API', () => {
  // Testing login end-point
  describe('/users/login', () => {
    it('A registered user should be able to login/default language', (done) => {
      const user = {
        email: 'jane@gmail.com',
        password: '123456',
      };
      chai
        .request(app)
        .post('/users/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.message.should.be.equal('You have successfully logged in as an Admin')
          done()
        })
    })
    it('A registered user should be able to login/Kinyarwanda Language', (done) => {
      const user = {
        email: 'jane@gmail.com',
        password: '123456',
      };
      chai
        .request(app)
        .post('/users/login/?lng=rw')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.message.should.be.equal('Winjiye neza nka Admin')
          done()
        })
    })
    it('A registered user should be able to login/French Language', (done) => {
      const user = {
        email: 'jane@gmail.com',
        password: '123456',
      };
      chai
        .request(app)
        .post('/users/login/?lng=fr')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.message.should.be.equal("Vous vous êtes connecté avec succès en tant qu'administrateur")
          done()
        })
    })
    it('A non-registered user shouldnot be able to login/eDfault Language', (done) => {
      const user = {
        email: 'nijohn@gmail.com',
        password: 'holdon',
      };
      chai
        .request(app)
        .post('/users/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.be.equal(
            'The email is not registered! Please first register'
          );
          done();
        });
    });
    it('A non-registered user shouldnot be able to login/Kinyarwanda Language', (done) => {
      const user = {
        email: 'nijohn@gmail.com',
        password: 'holdon',
      };
      chai
        .request(app)
        .post('/users/login/?lng=rw')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.be.equal(
            'Imeri yanditswe ntabwo tuyifite! Nyamuneka banza wiyandikishe'
          );
          done();
        });
    });
    it('A non-registered user shouldnot be able to login/French Language', (done) => {
      const user = {
        email: 'nijohn@gmail.com',
        password: 'holdon',
      };
      chai
        .request(app)
        .post('/users/login/?lng=fr')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.be.equal(
            "L'e-mail n'est pas enregistré ! Veuillez d'abord vous inscrire"
          );
          done();
        });
    });
    it('A registered user with wrong password logins shouldnot be able to login/Default Language', (done) => {
      const user = {
        email: 'jane@gmail.com',
        password: 'holdon',
      };
      chai
        .request(app)
        .post('/users/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.be.equal(
            'The email or passwords entered is wrong'
          );
          done();
        });
    });
    it('A registered user with wrong password logins shouldnot be able to login/Kinyarwanda Language', (done) => {
      const user = {
        email: 'jane@gmail.com',
        password: 'holdon',
      };
      chai
        .request(app)
        .post('/users/login/?lng=rw')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.be.equal(
            'Imeri cyangwa ijambo ryibanga ryinjiye sibyo'
          );
          done();
        });
    });
    it('A registered user with wrong password logins shouldnot be able to login/French Language', (done) => {
      const user = {
        email: 'jane@gmail.com',
        password: 'holdon',
      };
      chai
        .request(app)
        .post('/users/login/?lng=fr')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401)
          res.body.error.should.be.equal("L'e-mail ou les mots de passe saisis sont incorrects")
          done()
        })
    })
  })
})