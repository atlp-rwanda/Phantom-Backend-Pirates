import express from 'express'
import Routes from '../controllers/route'
import verifyAdminOperator from '../authorization/verifyAdminOperator';

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

  route.post('/api/routes',verifyAdminOperator, Routes.create);
  route.get('/api/routes', Routes.listAll);
  route.get('/api/routes/:id', Routes.list);
  route.put('/api/routes/:id', verifyAdminOperator,Routes.modify);
  route.delete('/api/routes/:id', verifyAdminOperator,Routes.delete);

export default route