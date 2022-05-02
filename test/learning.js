const chai = require('chai');
const chaiHttp = require('chai-http');
const {app} = require('../src/app')

chai.should;
chai.use(chaiHttp);

describe('Tests for the welcome page', () => {
    it('Render welcome page /', (done) => {
        chai
        .request(app)
        .get('/')
        .end((err, res) => {
            res.should.have.a.status(200);
            res.body.message.should.be.equal('Welcome to Phantom')
            done()
        })

    })
})