const chai = require('chai');
const chaiHTTP = require('chai-http');
const { app } = require('../src/app');

chai.should();
chai.use(chaiHTTP);

describe('Role APIs', () => {
  // test POST request
  describe('POST /api/role/ ', () => {
    it('It should creat a new role', (done) => {
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: 'jane@gmail.com',
          password: '123456',
        })
        .end((err, res) => {
          const token = res.body.adminToken;

          chai
            .request(app)
            .post('/api/role')
            .set('Accept', 'application/json')
            .set('authorization', `Bearer ${token}`)
            .send({ role: 'operator' })
            .end((error, response) => {
              response.should.have.status(200);
              response.body.should.be.a('object');
              done();
            });
        });
    });

    // when you try to enter invalid input
    it('It should return an error when entering invalid input', (done) => {
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: 'jane@gmail.com',
          password: '123456',
        })
        .end((err, res) => {
          const token = res.body.adminToken;

          chai
            .request(app)
            .post('/api/role')
            .set('Accept', 'application/json')
            .set('authorization', `Bearer ${token}`)
            .send({ role: 'driverse' })
            .end((error, response) => {
              response.should.have.status(400);
              response.body.should.be.a('object');
              response.body.should.have.property('message');
              done();
            });
        });
    });
  });

  // test GET request
  describe('GET /api/role ', () => {
    it('It should get all the roles', (done) => {
      chai
        .request(app)
        .get('/api/role')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  // test GET request by id
  describe('GET /api/role/:id ', () => {
    it('It should get all the role by ID', (done) => {
      const roleId = 1;
      chai
        .request(app)
        .get('/api/role/' + roleId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('role');
          done();
        });
    });

    it('It should get error for invalid role ID', (done) => {
      const roleId = 30;
      chai
        .request(app)
        .get('/api/role/' + roleId)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });

    it('It should get error for non numeric role ID', (done) => {
      const roleId = 'aaa';
      chai
        .request(app)
        .get('/api/role/' + roleId)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  // test PUT request
  describe('PUT /api/role/:id', () => {
    it('It should edit an existing role', (done) => {
      const roleId = 1;
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: 'jane@gmail.com',
          password: '123456',
        })
        .end((err, res) => {
          const token = res.body.adminToken;

          chai
            .request(app)
            .put('/api/role/' + roleId)
            .set('authorization', `Bearer ${token}`)
            .send({ role: 'admin' })
            .end((error, response) => {
              response.should.have.status(200);
              response.body.should.be.a('object');
              response.body.should.have.property('message');
              done();
            });
        });
    });

    it('It should an error for invalid role ID', (done) => {
      const roleId = 30;
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: 'jane@gmail.com',
          password: '123456',
        })
        .end((err, res) => {
          const token = res.body.adminToken;

          chai
            .request(app)
            .put('/api/role/' + roleId)
            .set('authorization', `Bearer ${token}`)
            .send({ role: 'admin' })
            .end((error, response) => {
              response.should.have.status(400);
              response.body.should.be.a('object');
              response.body.should.have.property('message');
              done();
            });
        });
    });

    it('It should an error for none numeric role ID', (done) => {
      const roleId = 'qqq';
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: 'jane@gmail.com',
          password: '123456',
        })
        .end((err, res) => {
          const token = res.body.adminToken;

          chai
            .request(app)
            .put('/api/role/' + roleId)
            .set('authorization', `Bearer ${token}`)
            .send({ role: 'admin' })
            .end((error, response) => {
              response.should.have.status(400);
              response.body.should.be.a('object');
              response.body.should.have.property('message');
              done();
            });
        });
    });
  });

  // test DELETE request
  describe('DELETE /api/role/:id', () => {
    it('It should delete a role', (done) => {
      const roleId = 1;
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: 'jane@gmail.com',
          password: '123456',
        })
        .end((err, res) => {
          const token = res.body.adminToken;

          chai
            .request(app)
            .delete('/api/role/' + roleId)
            .set('authorization', `Bearer ${token}`)
            .end((error, response) => {
              response.should.have.status(200);
              response.body.should.be.a('object');
              response.body.should.have.property('message');
              done();
            });
        });
    });

    it('It should return an error  for invalid role ID ', (done) => {
      const roleId = 5000;
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: 'jane@gmail.com',
          password: '123456',
        })
        .end((err, res) => {
          const token = res.body.adminToken;

          chai
            .request(app)
            .delete('/api/role/' + roleId)
            .set('authorization', `Bearer ${token}`)
            .end((error, response) => {
              response.should.have.status(400);
              response.body.should.be.a('object');
              response.body.should.have.property('message');
              done();
            });
        });
    });

    it('It should return an error  for non numeric role ID ', (done) => {
      const roleId = 'aaaa';
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: 'jane@gmail.com',
          password: '123456',
        })
        .end((err, res) => {
          const token = res.body.adminToken;

          chai
            .request(app)
            .delete('/api/role/' + roleId)
            .set('authorization', `Bearer ${token}`)
            .end((error, response) => {
              response.should.have.status(400);
              response.body.should.be.a('object');
              response.body.should.have.property('message');
              done();
            });
        });
    });
  });
});
