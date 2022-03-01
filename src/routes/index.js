import express from 'express'
import Buses from '../controllers/bus'
import Companies from '../controllers/company'
const route = express.Router()

// Welcome endpoint
/**
 * @swagger
 * /:
 *  get:
 *    description: Used to display the Welcome Page
 *    responses:
 *      '200':
 *        description: The Welcome Page was displayed successfully
 */

route.post('/api/buses/:cid/bus', Buses.create)
route.get('/api/buses', Buses.listAll)
route.get('/api/buses/:id', Buses.list)
route.put('/api/buses/:bId', Buses.modify)
route.delete('/api/buses/:busId', Buses.delete)

route.post('/api/company', Companies.create)
route.get('/api/company', Companies.listAll)
route.delete('/api/company/:id', Companies.delete)
route.get('/api/company/:id', Companies.list)
route.put('/api/company/:id', Companies.modify)

export default route
