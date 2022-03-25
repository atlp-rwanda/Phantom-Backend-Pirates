const chai = require('chai')
const chaiHTTP = require('chai-http')
const { response } = require('express')
const { app } = require('../src/app')
const { default: generatePassword } = require('../src/miscellaneous/generatepassword')

chai.should()
chai.use(chaiHTTP)

describe('registeringAPI', () => {
   
    //Add a new employee test
    describe("POST /employees/:id", () => {     
      it("it should add an employee", (done) => {

        const id = 3
        const employee = {
              firstname:"Frank",
              lastname:"Irankunda",
              email:"irank456@gmail.com",  
        }
       chai.request(app)
       .post("/employees/"+id)
       .send(employee)
       .end((err, response) => {
          response.should.have.status(201),
          response.body.message.should.be.equal('Employee added successfully')
      done();
      })
      })
    })


 // GET all Employees according to role test
describe("GET /roles/employees", () => {          
    it("it should GET all Employees according to role", (done) => {
        chai.request(app)
        .get("/roles/employees")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array')
        done()
      })
  })
  })

   //Get all employees with the same role test
  describe("GET /employeesInRole/1", () => {          
    it("it should GET all Employees with the same roleId", (done) => {
        chai.request(app)
        .get("/employeesInRole/1")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
        done()
      })
  })
  })

  //Get all employees test
  describe("GET /employees", () => {           
    it("it should GET all Employees", (done) => {
        chai.request(app)
        .get("/employees/list")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
        done()
      })
  })
  })


  //Get a single employee test
  describe("GET /employees/:id", () => {           
    it("it should GET an Employee by ID", (done) => {
        const id = 1;
        chai.request(app)
        .get("/employees/"+id)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('id'); 
          response.body.should.have.property('firstname');  
          response.body.should.have.property('lastname');
          response.body.should.have.property('email'); 
        done()
      })
  })
  })


       //Update employee test
      describe("PUT /employees/:id", () => {    
        it("it should update an employee's information", (done) => {
            const id=1;
            const employee = {
                firstname:"Julesxx",
                lastname:"Himbaza",
                email:"jules10@gmail.com",
                roleId:2,
            };
         chai.request(app)
         .put("/employees/"+id)
         .send(employee)
         .end((err, response) => {
            response.should.have.status(200),
            response.body.message.should.be.equal('Employee updated successfully')
        done();
        })
        })
      })


    //delete employee test  
    describe('DELETE /employees/:id',() => {
        it('should DELETE employee by ID', (done) => {
            const id = 3;
          chai.request(app)
          .delete('/employees/'+id)
          .end((eer, response) => {
              response.should.have.status(200);
              done();
           });
      })})
})
