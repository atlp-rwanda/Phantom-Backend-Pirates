const chai = require('chai')
const chaiHttp = require('chai-http')
const API = 'http://localhost:3001'

// Assertion style

chai.should()
chai.use(chaiHttp)

describe('Routes API', () => {
  /* Test the GET route */
  describe('GET /api/routes', () => {
    it('It should GET all the routes', (done) => {
      chai.request(API)
        .get('/api/routes')
        .end((err, response) => {
          response.should.have.status(200)
          response.body.should.be.a('array')
          done()
        })
    })
  })
  it('It should NOT GET the routes', (done) => {
    chai.request(API)
      .get('/api/route')
      .end((err, response) => {
        response.should.have.status(404)

        done()
      })
  })

  /* Test the GET by ID route */
  describe('GET /api/routes/:id', () => {
    it('It should GET a task by ID', (done) => {
      const routeId = 1
      chai.request(API)
        .get('/api/routes/' + routeId)
        .end((err, response) => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('data')
          response.body.should.have.property('message')
          response.body.message.should.be.equal('Route fetch Successfully')
          response.body.data.busStop.should.be.a('array')
          response.body.data.should.have.property('id')

          done()
        })
    })
  })

  /* Test the POST route */
  describe('POST /api/routes', () => {
    it('It should not POST a new route without authorization', (done) => {
      const route = {
        source: 'Gasogi',
        destination: 'Gishushu',
        distance: 1233,
        busStop: ['Nyamirambo', 'Kicukiro', 'Remera', 'Kabuga']
      }
      chai.request(API)
        .post('/api/routes')
        .send(route)
        .end((err, response) => {
          response.should.have.status(400),
          response.body.message.should.be.equal('Access Denied!, Only Admin can perform this task')

          done()
        })
    })
  })

  /* Test the PUT route */
  describe('PUT /api/routes/:id', () => {
    it('It should not PUT a new route without authorization', (done) => {
      const routeId = 1
      const route = {
        source: 'gatsata',
        destination: 'Kimicanga',
        distance: 6080,
        busStop: ['Nyamirambo', 'Campkigali', 'Kicukiro', 'Remera', 'Kabuga']

      }
      chai.request(API)
        .put('/api/routes/' + routeId)
        .send(route)
        .end((err, response) => {
          response.should.have.status(400),
          response.body.message.should.be.equal('Access Denied!, Only Admin can perform this task')

          done()
        })
    })
  })

  /* Test the DELETE route */
  describe('DELETE /api/routes/:id', () => {
    it('It should not DELETE a route without authorization', (done) => {
      const routeId = 1
      chai.request(API)
        .delete('/api/routes/' + routeId)
        .end((err, response) => {
          response.should.have.status(400),
          response.body.message.should.be.equal('Access Denied!, Only Admin can perform this task')

          done()
        })
    })
  })
})
