// const chai = require('chai');
// const chaiHTTP = require('chai-http');
// const { app } = require('../src/app');

// chai.should();
// chai.use(chaiHTTP);

// describe('Testing role APIs', () => {
//   // test GET route
//   describe('GET /api/role ', () => {
//     it('It should get all the roles', (done) => {
//       chai
//         .request(app)
//         .get('/api/role')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('array');
//           done();
//         });
//     });
//   });

//   // test GET route by id
//   describe('GET /api/role/:id ', () => {
//     it('It should get all the role by ID', (done) => {
//       const roleId = 1;
//       chai
//         .request(app)
//         .get('/api/role/' + roleId)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.should.have.property('id');
//           res.body.should.have.property('role');
//           done();
//         });
//     });
//   });

//   // test POST route
//   describe('POST /api/role/ ', () => {
//     it('It should post a new role', (done) => {
//       chai
//         .request(app)
//         .post('/users/login')
//         .send({
//           email: 'doe@gmail.com',
//           password: 'holdon0006',
//         })
//         .end((err, res) => {
//           const token = res.body.adminToken;

//           chai
//             .request(app)
//             .post('/api/role')
//             .set('authorization', token)
//             .send({ role: 'driver' })
//             .end((error, response) => {
//               response.should.have.status(200);
//               response.body.should.be.a('object');
//               response.body.should.have.property('message');
//               response.body.should.have.property('role');
//               done();
//             });
//         });
//     });
//   });

//   // test PUT route
//   describe('PUT /api/role/:id', () => {
//     it('It should edit an existing role', (done) => {
//       const roleId = 1;
//       chai
//         .request(app)
//         .post('/users/login')
//         .send({
//           email: 'doe@gmail.com',
//           password: 'holdon0006',
//         })
//         .end((err, res) => {
//           const token = res.body.adminToken;

//           chai
//             .request(app)
//             .put('/api/role/' + roleId)
//             .set('authorization', token)
//             .send({ role: 'admin' })
//             .end((error, response) => {
//               response.should.have.status(200);
//               response.body.should.be.a('object');
//               response.body.should.have.property('message');
//               if (error) console.log(error);
//               done();
//             });
//         });
//     });
//   });
// });
