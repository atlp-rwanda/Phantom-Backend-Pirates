const chai = require('chai')
const chaiHttp = require('chai-http')
const { app } = require('../src/app');

// Assertion style

chai.should()
chai.use(chaiHttp)

describe('Assigning bus to drivers API', () => {
  /* Test the list of already assigned buses to drivers*/
  describe('GET /api/drivers/buses', () => {
    it('It should GET a list of all Buses assigned to drivers', (done) => {
      chai.request(app)
        .get('/api/drivers/buses')
        .end((err, response) => {
          response.should.have.status(200)
          response.body.should.be.a('array')
          done()
        })
    })
  })
  it('It should NOT GET the list of buses assigned to drivers with wrong API', (done) => {
    chai.request(app)
      .get('/api/drivers/bus')
      .end((err, response) => {
        response.should.have.status(404)

        done()
      })
  })
  it('It should update bus table with drivers', (done)=>{
    const employeeId= 1;
    const busId = 2;
    chai
      .request(app)
      .post('/users/login')
      .send({
        email: 'uid2710@gmail.com',
        password: '123456',
      })
      .end((err, res) => {
        const token = res.body.adminToken;
        chai
        .request(app)
        .patch(`/api/buses/${busId}/${employeeId}`)
        .set('Accept', 'application/json')
        .set('authorization', token)
        res.should.have.status(200)
      done() })
 
})
})
