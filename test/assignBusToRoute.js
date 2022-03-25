const chai = require('chai');
const chaiHTTP = require('chai-http');
const { app } = require('../src/app');

chai.should();
chai.use(chaiHTTP);

describe('Assoign Bus APIs', () => {
  describe('PUT /api/routes/:routeId/bus/:busId ', () => {
    it('It should assign a bus to route', (done) => {
      const routeId = 1;
      const busId = 3;
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: 'doe@gmail.com',
          password: 'holdon0006',
        })
        .end((err, res) => {
          const token = res.body.adminToken;

          chai
            .request(app)
            .post('/api/buses/1/bus')
            .set('Accept', 'application/json')
            .set('authorization', token)
            .send({
              plate: 'RAA900A',
              category: 'Yutong',
              seat: 50,
              status: 'available',
            })
            .end((error, response) => {
              chai
                .request(app)
                .post('/api/buses/1/bus')
                .set('Accept', 'application/json')
                .set('authorization', token)
                .send({
                  source: 'kimisagara',
                  destination: 'nyabugogo',
                  distance: '3 km',
                })
                .end((err, res) => {
                  chai
                    .request(app)
                    .patch(`/api/routes/${routeId}/bus/${busId}`)
                    .set('Accept', 'application/json')
                    .set('authorization', token)
                    .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message');
                      done();
                    });
                });
            });
        });
    });

    it('It should return an error for invalid route id', (done) => {
      const routeId = 'aassd';
      const busId = 'qqqqqq';
      chai
        .request(app)
        .post('/users/login')
        .send({
          email: 'doe@gmail.com',
          password: 'holdon0006',
        })
        .end((err, res) => {
          const token = res.body.adminToken;

          chai
            .request(app)
            .post('/api/buses/1/bus')
            .set('Accept', 'application/json')
            .set('authorization', token)
            .send({
              plate: 'RAA900A',
              category: 'Yutong',
              seat: 50,
              status: 'available',
            })
            .end((error, response) => {
              chai
                .request(app)
                .post('/api/buses/1/bus')
                .set('Accept', 'application/json')
                .set('authorization', token)
                .send({
                  source: 'kimisagara',
                  destination: 'nyabugogo',
                  distance: '3 km',
                })
                .end((err, res) => {
                  chai
                    .request(app)
                    .patch(`/api/routes/${routeId}/bus/${busId}`)
                    .set('Accept', 'application/json')
                    .set('authorization', token)
                    .end((err, res) => {
                      res.should.have.status(400);
                      res.body.should.be.a('object');
                      done();
                    });
                });
            });
        });
    });
  });

  describe('GET /api/routes/buses/{routeI}', () => {
    it('It should get all buses assigned to a specified route', (done) => {
      const routeId = 3;
      chai
        .request(app)
        .get(`/api/routes/buses/${routeId}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('It should get an error for invalid route id route', (done) => {
      const routeId = 'aaaaaa';
      chai
        .request(app)
        .get(`/api/routes/buses/${routeId}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
