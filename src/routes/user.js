import express from 'express'
import Users from '../controllers/user'

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

  route.post('/api/users', Users.create);
  route.get('/api/users', Users.listAll);
  route.get('/api/users/:id', Users.list);
  route.put('/api/users/:id', Users.modify);
  route.delete('/api/users/:id', Users.delete);

export default route
