import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app'

chai.use(chaiHttp)

describe('Accessing Home Page', () => {

  it('welcomes user to the api in english/default', done => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(200).to.equal(res.status)
        expect('Welcome to Phantom Web').to.equal(res.body.message)
        expect(false).to.equal(res.body.error)
        done()
      })
  })

  it('welcomes user to the api in french', done => {
    chai.request(app)
      .get('/?lng=fr')
      .end((err, res) => {
        expect(200).to.equal(res.status)
        expect('Bienvenue sur le Web de Phantom').to.equal(res.body.message)
        expect(false).to.equal(res.body.error)
        done()
      })
  })

  it('welcomes user to the api in Kinyarwanda', done => {
    chai.request(app)
      .get('/?lng=rw')
      .end((err, res) => {
        expect(200).to.equal(res.status)
        expect("Ikaze k'Urubuga rwa Phantom").to.equal(res.body.message)
        expect(false).to.equal(res.body.error)
        done()
      })
  })

  it('404 Error', done => {
    chai.request(app)
      .get('/random')
      .end((err, res) => {
        expect(404).to.equal(res.status)
        // expect("Ikaze k'Urubuga rwa Phantom").to.equal(res.body.data)
        done()
      })
    })

})
