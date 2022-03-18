const chai = require('chai')
const chaiHTTP = require('chai-http')
const { app } = require('../src/app')

chai.should()
chai.use(chaiHTTP)


describe('Company API', () => {

  it('It should create a company', (done) => {
      const company = {
        name: 'bus11',
        email: 'bus11@gmail.com'
      };
      chai.request(app)
        .post('/api/company')
        .set('Accept', 'application/json')
        .send(company)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('It should not create a company with incomplete parameters', (done) => {
      const company = {
        email: '',
      };
      chai.request(app)
        .post('/api/company')
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

  it('It should update a company', (done) => {
      const companyId = 1;
      const updatedCompany = {
        id: companyId,
        name: 'rugali'
      };
      chai.request(app)
        .put(`/api/company/${companyId}`)
        .set('Accept', 'application/json')
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
        name: 'rugali'
      };
      chai.request(app)
        .put(`/api/company/${id}`)
        .set('Accept', 'application/json')
        .send(updatedcompany)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('It should delete a company', (done) => {
      const id = 2;
      chai.request(app)
        .delete(`/api/company/${id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('It should not delete a bus with invalid id', (done) => {
      const id = 777;
      chai.request(app)
        .delete(`/api/company/${id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });


});


describe('Bus API', () => {

    it('it Should show return all buses', (done) => {
      chai
        .request(app)
        .get('/api/buses')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
    it('it Should show Not return all buses', (done) => {
      chai
        .request(app)
        .get('/api/busess')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('It should get a particular one bus by ID', (done) => {
      const id = 1;
      chai
        .request(app)
        .get(`/api/buses/${id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('It should not retrieve  a particular buses when id dont exist', (done) => {
      const id = 51;
      chai
        .request(app)
        .get(`/api/buses/${id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eq('Bus not found');
          done();
        });
    });

    it('It should update a company', (done) => {
        const companyId = 1;
        const updatedCompany = {
          id: companyId,
          name: 'rugali'
        };
        chai.request(app)
          .put(`/api/company/${companyId}`)
          .set('Accept', 'application/json')
          .send(updatedCompany)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
      it('It should not update a bus with invalid id', (done) => {
        const id = '99';
        const updatedbus = {
          id: id,
          plate: 'RAD 234 S'
        };
        chai.request(app)
          .put(`/api/buses/${id}`)
          .set('Accept', 'application/json')
          .send(updatedbus)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });

      it('It should create a bus', (done) => {
        const cid = 1;
        const bus = {
          plate: 'RAE 622 F',
          category: 'yutong',
          seat: 80
        };
        chai.request(app)
          .post(`/api/buses/${cid}/bus`)
          .set('Accept', 'application/json')
          .send(bus)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
      it('It should not create a bus with incomplete parameters', (done) => {
        const cid = 1;
        const bus = {
          plate: '',
          category: 'available'
        };
        chai.request(app)
          .post(`/api/buses/${cid}/bus`)
          .set('Accept', 'application/json')
          .send(bus)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
      it('It should not create a bus with exist plate', (done) => {
        const cid = 1;
        const bus = {
          plate: 'RAE 622 F',
          category: 'yutong',
          seat: 80
        };
        chai.request(app)
          .post(`/api/buses/${cid}/bus`)
          .set('Accept', 'application/json')
          .send(bus)
          .end((err, res) => {
            res.should.have.status(400);
            res.text.should.be.eq('{"message":"Enter Valid plate number"}');
            done();
          });
      });

     it('It should delete a bus', (done) => {
        const busId = 2;
        chai.request(app)
          .delete(`/api/buses/${busId}`)
          .set('Accept', 'application/json')
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

      it('It should not delete a bus with invalid id', (done) => {
        const busId = 777;
        chai.request(app)
          .delete(`/api/buses/${busId}`)
          .set('Accept', 'application/json')
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });

  
});

