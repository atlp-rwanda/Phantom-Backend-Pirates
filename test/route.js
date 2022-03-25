const chai = require('chai');
const chaiHttp = require('chai-http');
const API = 'http://localhost:4000';

// Assertion style

chai.should();
chai.use(chaiHttp);

describe('Routes API', () => {
  /* Test the GET route */
  describe('GET /api/routes', () => {
    it('It should GET all routes', (done) => {
      chai
        .request(API)
        .get('/api/routes')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        });
    });
  });
  it('It should NOT GET the route with wrong API', (done) => {
    chai
      .request(API)
      .get('/api/route')
      .end((err, response) => {
        response.should.have.status(404);

        done();
      });
  });

  /* Test the GET by ID route */
  describe('GET /api/routes/:id', () => {
    it('It should GET a task by ID', (done) => {
      const routeId = 28;
      chai
        .request(API)
        .get('/api/routes/' + routeId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('data');
          response.body.should.have.property('message');
          response.body.data.busStop.should.be.a('array');
          response.body.data.should.have.property('id');

          done();
        });
    });
    it('It should NOT GET the route with wrong id', (done) => {
      const routeId = 17;
      chai
        .request(API)
        .get('/api/route/' + routeId)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a('object');
          done();
        });
    });
  });

  /* Test the POST route */
  describe('POST /api/routes', () => {
    it('It should POST a new route', (done) => {
      const route = {
        source: 'Gasogi',
        destination: 'Gishushu',
        distance: 1233,
        busStop: [
          'Gasogis',
          'Nyamirambo',
          'Kicukiro',
          'Remera',
          'Nyamirambo',
          'Onatracom',
        ],
      };
      chai
        .request(API)
        .post('/api/routes')
        .send(route)
        .end((err, response) => {
          response.should.have.status(201),
            response.body.message.should.be.equal('Route successfully created');

          done();
        });
    });
  });

  /* Test the PUT route */
  describe('PUT /api/routes/:id', () => {
    it('It should update route', (done) => {
      const routeId = 28;
      const route = {
        source: 'gatsata',
        destination: 'Kimicanga',
        distance: 6080,
        busStop: ['Nyamirambo', 'Campkigali', 'Kicukiro', 'Remera', 'Kabuga'],
      };
      chai
        .request(API)
        .put('/api/routes/' + routeId)
        .send(route)
        .end((err, response) => {
          response.should.have.status(200),
            response.body.message.should.be.equal(
              'Route is successfully updated'
            );

          done();
        });
    });
  });

  /* Test the DELETE route */
  describe('DELETE /api/routes/:id', () => {
    it('It should DELETE a route', (done) => {
      const routeId = 28;
      chai
        .request(API)
        .delete('/api/routes/' + routeId)
        .end((err, response) => {
          response.should.have.status(200),
            response.body.message.should.be.equal('route successfully deleted');

          done();
        });
    });
  });
});
