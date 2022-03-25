const chai = require('chai')
const chaiHTTP = require('chai-http')
const { app } = require('../src/app')

chai.should()
chai.use(chaiHTTP)

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
          res.text.should.be.eq('{"message":"Bus not found"}');
          done();
        });
    });

    it('It should update a bus', (done) => {
        const busId = 1;
        const updatedBus = {
          id: busId,
          plate: 'RAF122D',
          category: 'yutong',
          seat: '80'
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
            res.should.have.status(200)
            res.body.message.should.be.equal('You have successfully logged in as an Admin')
            var token = res.body.adminToken;
        chai.request(app)
          .put(`/api/buses/${busId}`)
          .set('Cookie', `jwt = ${token}`)
          .send(updatedBus)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
      it('It should not update a bus with invalid id', (done) => {
        const id = '99';
        const updatedbus = {
          id: id,
          plate: 'RAD 234 S'
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
            res.should.have.status(200)
            res.body.message.should.be.equal('You have successfully logged in as an Admin')
            var token = res.body.adminToken;
        chai.request(app)
          .put(`/api/buses/${id}`)
          .set('Cookie', `jwt = ${token}`)
          .send(updatedbus)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });

    it('It should create a bus', (done) => {
      const cid = 1;
      const bus = {
        plate: "RAD444F",
        category: "yutong",
        seat: 80,
        status: "available",
        rout_id: 1,
        cid: 1
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
          res.should.have.status(200)
          res.body.message.should.be.equal('You have successfully logged in as an Admin')
          var token = res.body.adminToken;
      chai
        .request(app)
        .post(`/api/buses/${cid}/bus`)
        .set('Cookie', `jwt = ${token}`)
        .send(bus)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  })
      it('It should not create a bus with incomplete parameters', (done) => {
        const cid = 1;
        const bus = {
          plate: '',
          category: 'available'
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
            res.should.have.status(200)
            res.body.message.should.be.equal('You have successfully logged in as an Admin')
            var token = res.body.adminToken;
        chai.request(app)
          .post(`/api/buses/${cid}/bus`)
          .set('Cookie', `jwt = ${token}`)
          .send(bus)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });
      it('It should not create a bus with exist plate', (done) => {
        const cid = 1;
        const bus = {
          plate: 'RAE 622 F',
          category: 'yutong',
          seat: 80
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
            res.should.have.status(200)
            res.body.message.should.be.equal('You have successfully logged in as an Admin')
            var token = res.body.adminToken;
        chai.request(app)
          .post(`/api/buses/${cid}/bus`)
          .set('Cookie', `jwt = ${token}`)
          .send(bus)
          .end((err, res) => {
            res.should.have.status(400);
            res.text.should.be.eq('{"message":"Enter Valid plate number..(RAA000A)"}');
            done();
          });
      });
    });

     it('It should delete a bus', (done) => {
        const busId = 2;
        const user = {
          email:"jane@gmail.com",
          password:"123456"
        }
        chai
          .request(app)
          .post('/users/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.message.should.be.equal('You have successfully logged in as an Admin')
            var token = res.body.adminToken;
        chai.request(app)
          .delete(`/api/buses/${busId}`)
          .set('Cookie', `jwt = ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    })
      it('It should not delete a bus with invalid id', (done) => {
        const busId = 777;
        const user = {
          email:"jane@gmail.com",
          password:"123456"
        }
        chai
          .request(app)
          .post('/users/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.message.should.be.equal('You have successfully logged in as an Admin')
            var token = res.body.adminToken;
        chai.request(app)
          .delete(`/api/buses/${busId}`)
          .set('Cookie', `jwt = ${token}`)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
      });
  
});

