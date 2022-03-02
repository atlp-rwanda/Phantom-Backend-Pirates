const chai = require('chai')
const chaiHTTP = require('chai-http')
const { app } = require('../src/app')

chai.should()
chai.use(chaiHTTP)

describe('User View Bus API', () => {
    it('It should Retrieve bus inside choosen source and destination', (done) => {
        const view = {
          source: 'remera',
          destination: 'nyabugogo',
        };
        chai.request(app)
          .post('/api/viewbus')
          .set('Accept', 'application/json')
          .send(view)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
      it('It should not Retrieve bus inside invalid source and destination', (done) => {
        const view = {
          source: 'remera',
          destination: 'nyanza',
        };
        chai.request(app)
          .post('/api/viewbus')
          .set('Accept', 'application/json')
          .send(view)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
})  