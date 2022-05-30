const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../src/app');
const dotenv = require('dotenv');

dotenv.config()

chai.should()
chai.use(chaiHttp)

describe('Change Password', () => {
    // Testing change password end-point
    it.skip('An authenticated user should be able to change password', (done) => {
      
        const changePassword = {
          email: 'jane@gmail.com',
          oldPassword: '123456',
          newPassword: '123456',
          passwordConfirm: '123456'
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
            var adminToken = res.body.adminToken
        chai.request(app)
          .post('/changepassword')
          .set('authorization', `Bearer ${token}`)
          .send(changePassword)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.be.equal('Password Successfully changed')
            done();
          });
      });
    });
  
});

