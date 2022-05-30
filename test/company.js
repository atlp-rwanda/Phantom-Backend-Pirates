const chai = require('chai')
const chaiHttp = require('chai-http')
const { sequelize } = require('../models')
const { app } = require('../src/app')

chai.should()
chai.use(chaiHttp)

describe('login', () => {
  var token;
 before((done)=> {
  const user = {
    email:"jane@gmail.com",
    password:"123456"
  }
  chai
    .request(app)
    .post('/users/login')
    .send(user)
    .end((err, res) => {
     token = res.body.adminToken;
    })
    done();
 })

    it('It should create a company', (done) => {
        const company = {
          name: 'kbsss12',
          email: 'kbs1@gmail.com',
        };
        const user = {
          email:"jane@gmail.com",
          password:"123456"
        }
        chai
          .request(app)
          .post('/users/login')
          .send(user)
          .end((err, res) => {
           var admintoken = res.body.adminToken;
        chai.request(app)
          .post('/api/company')
          .set('authorization', `Bearer ${admintoken}`)
          .send(company)
          .end((err, res) => {
            res.body.message.should.be.eq('company successfully created');
            
          });
        })
        done();
      })
      it('It should not create a company with incomplete parameters', (done) => {
        const company = {
          email: '',
        };
        
        chai.request(app)
          .post('/api/company')
          .set('authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .send(company)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
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
      const id = 1;
      chai
        .request(app)
        .get(`/api/company/${id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.name.should.be.eq('volcano');
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
          res.body.message.should.be.eq('Company not found');
          done();
        });
    });
  
    it('It should update a company', (done) => {
        const companyId = 1;
        const updatedCompany = {
          id: companyId,
          name: 'rugali',
          email: 'volcano@gmail.com'
        };
        
        chai.request(app)
          .put(`/api/company/${companyId}`)
          .set('authorization', `Bearer ${token}`)
          .send(updatedCompany)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
     });
      it('It should not update a company with invalid id', (done) => {
        const id = '99';
        const updatedcompany = {
          id: id,
          name: 'rugali',
          email: 'volcano@gmail.com'
        };
        
        chai.request(app)
          .put(`/api/company/${id}`)
          .set('authorization', `Bearer ${token}`)
          .send(updatedcompany)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
    });
  
      it('It should delete a company', (done) => {
        const id = 2;
        
        chai.request(app)
          .delete(`/api/company/${id}`)
          .set('authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      })
      it('It should not delete a company with invalid id', (done) => {
        const id = 777;
        chai.request(app)
          .delete(`/api/company/${id}`)
          .set('authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
  });