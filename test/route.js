let chai =require("chai");
let chaiHttp= require("chai-http");
/* const { describe } = require("yargs"); */
let server= require("../src/app");
const API = 'http://localhost:3001';


//Assertion style

chai.should();
chai.use(chaiHttp);


describe('Routes API', ()=>{
    /* Test the GET route */
    describe("GET /api/routes",()=>{
        it("It should GET all the routes",(done)=>{
            chai.request(API)
            .get("/api/routes")
            .end((err,response)=>{
                response.should.have.status(200)
                response.body.should.be.a('array');
                response.body.length.should.be.eq(6);
            done();
            })
        })
    })
    it("It should NOT GET the routes",(done)=>{
        chai.request(API)
        .get("/api/route")
        .end((err,response)=>{
            response.should.have.status(404);
            
        done();
        })
    })

    /* Test the GET by ID route */
    describe("GET /api/routes/:id",()=>{
        it("It should GET a task by ID",(done)=>{
            const routeId=1;
            chai.request(API)
            .get("/api/routes/" + routeId)
            .end((err,response)=>{
                response.should.have.status(200)
                response.body.should.be.a('object');
                response.body.should.have.property('data');
                response.body.should.have.property('message');


            done();
            })
        })
    })

    /* Test the POST route */


    /* Test the PUT route */

    /* Test the PATCH route */


    /* Test the DELETE route */
})
