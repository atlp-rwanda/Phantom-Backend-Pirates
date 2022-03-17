const chai = require('chai')
const chaiHttp = require('chai-http')
const API = 'http://localhost:4000'

// Assertion style

chai.should()
chai.use(chaiHttp)

describe('Routes API', () => {
  /* Test the GET route */
  describe('GET /api/routes', () => {
    it('It should GET all routes', (done) => {
      chai.request(API)
        .get('/api/routes')
        .end((err, response) => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          done()
        })
    })
  })
  it('It should NOT GET the route with wrong API', (done) => {
    chai.request(API)
      .get('/api/route')
      .end((err, response) => {
        response.should.have.status(404)

        done()
      })
  })

  /* Test the GET by ID route */
  describe('GET /api/routes/:id', () => {
    it('It should GET a route by ID', async() => {
      const routeId =1
      chai.request(API)
        .get('/api/routes/' + routeId)
        .end((err, response) => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('data')
          response.body.should.have.property('message')
          response.body.data.busStop.should.be.a('array')
          response.body.data.should.have.property('id')

          done()
        })
    })
    it('It should NOT GET the route with wrong id', (done) => {
        const routeId = 4
        chai.request(API)
          .get('/api/route/' + routeId)
          .end((err, response) => {
            response.should.have.status(404)
            response.body.should.be.a('object')
            done()
          })
      })
  })


  /* Test the POST route */
  describe('POST /api/routes', () => {
    it('It should POST a new route', (done) => {
      chai
      .request(API)
      .post('/users/login')
      .send({
        email:"jane@gmail.com",
        password:"123456"
       })
       .end((err,res)=>{
         const token = res.body.adminToken;
       chai
        .request(API)
        .post('/api/routes')
        .set('authorization', token)
        .send({
        source: 'gatsata',
        destination: 'Kimicanga',
        distance: 6080,
        busStop: ['15', '19', 'Kicukiro','onatracom', 'KCT','Remera', 'Kabuga','Nyarugenge']
        })
        .end((err, response) => {
          response.should.have.status(201),
          response.body.should.be.a('object'),
          response.body.message.should.be.equal('Route successfully created')

          done()
        })
    })
  })
})
  /* Test the PUT route */
   describe('PUT /api/routes/:id', () => {
    it('It should update route', (done) => {
      const routeId = 2
      chai
      .request(API)
      .post('/users/login')
      .send({
        email:'doe@gmail.com',
        password:'holdon0006'
      })
      .end((err,res)=>{
        const token= res.body.adminToken;
        chai
        .request(API)
        .put('/api/routes/' + routeId)
        .set('authorization',token)
        .send(
          {
            source: 'gatsata',
            destination: 'Kimicanga',
            distance: 6080,
            busStop: ['Nyamirambo', 'Masoro', 'Chuk','Makuza', 'onatracom','Rubangura','Remera', 'Kabuga']
    
          }
        )
        .end((err, response) => {
          response.should.have.status(200),
          response.body.message.should.be.equal('Route is successfully updated')})
          done()
        })
    })
  }) 
  /* Delete route */
  describe('DELETE /api/routes/:id', () => {
  it('It should delete a route', (done) => {
    const id = 2;
    const user = {
      email:"jane@gmail.com",
      password:"123456"
    }
    chai
      .request(API)
      .post('/users/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.message.should.be.equal('You have successfully logged in as an Admin')
        var token = res.body.adminToken;
    chai.request(API)
      .delete(`/api/routes/${id}`)
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
});
});
