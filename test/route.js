const chai = require('chai');
const chaiHttp = require('chai-http');
const {app} = require('../src/app');

// Assertion style

chai.should();
chai.use(chaiHttp);

describe('Routes API', () => {
  /* Test the GET route */
  describe('GET /api/routes', () => {
    it('It should GET all routes', (done) => {
      chai
        .request(app)
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
      .request(app)
      .get('/api/route')
      .end((err, response) => {
        response.should.have.status(404);

        done();
      });
  });

  /* Test the GET by ID route */
  describe('GET /api/routes/:id', () => {
    it('It should GET a route by ID', (done) => {
      const routeId = 1;
      chai
        .request(app)
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
        .request(app)
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
      chai
      .request(app)
      .post('/users/login')
      .send({
        email:"uid2710@gmail.com",
        password:"123456"
       })
       .end((err,res)=>{
         const token = res.body.adminToken;
       chai
        .request(app)
        .post('/api/routes')
        .set('Cookie', `jwt = ${token}`)
        .send({
        source: 'gatsata',
        destination: 'Kimicanga',
        distance: 6080,
        busStop: ['15', '43', 'Kicukiro','onatracom', 'KCT','Remera', 'Kabuga','Nyarugenge']
        })
        .end((err, response) => {
          console.log(err)
          response.should.have.status(201),
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
      .request(app)
      .post('/users/login')
      .send({
        email:"uid2710@gmail.com",
        password:'123456'
      })
      .end((err,res)=>{
        const token= res.body.adminToken;
        chai
        .request(app)
        .put('/api/routes/' + routeId)
        .set('Cookie', `jwt = ${token}`)
        .send(
          {
            source: 'gatsata',
            destination: 'Kimicanga',
            distance: 6080,
            busStop: ['Nyamirambo', 'Masoro', 'Chuk','Makuza', 'onatracom','Rubangura','Remera', 'Kabuga','38']
    
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
      email:"uid2710@gmail.com",
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
      .delete(`/api/routes/${id}`)
      .set('Cookie', `jwt = ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
});
});