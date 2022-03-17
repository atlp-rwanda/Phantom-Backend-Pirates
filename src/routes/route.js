import express from 'express'
import Routes from '../controllers/route'
import verifyAdmnOperator from '../authorization/verifyAdmnOperator'

const route = express.Router()

// Welcome endpoint
/**
* @swagger
* tags:
*    name: Routes
*    description: API to manage Bus Routes.
*/

/**
 * @swagger
 * definitions:
 *   Route:
 *     properties:
 *       source:
 *         type: string
 *       destination:
 *         type: string
 *       distance:
 *         type: integer
 *       busStop:
 *         type: array
 */

/**
 * @swagger
 * /api/routes:
 *   get:
 *     tags:
 *       - Routes
 *     summary: This api is used to check if the get method on routes is working
 *     description: This api is used to fetch data from database
 *     responses:
 *         200:
 *             description: To get all routes from database
 *
 */
/**
 * @swagger
 * /api/routes/{id}:
 *   get:
 *     tags:
 *       - Routes
 *     summary: Retrieve single route API
 *     description: Returns a single route
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Route's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single route
 *         schema:
 *           $ref: '#/definitions/Route'
 */
/**
 * @swagger
 * /api/routes:
 *   post:
 *     tags:
 *       - Routes
 *     summary: This API is used to post a new route
 *     description: Creates a new route
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         required: true
 *       - name: route
 *         description: Route object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Route'
 *     responses:
 *       200:
 *         description: Successfully created
 */
/**
 * @swagger
 * /api/routes/{id}:
 *  put:
 *   tags:
 *    - Routes
 *   summary: update route API
 *   description: update route
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - name: authorization
 *      in: header
 *      required: true
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of route
 *      example: 1
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: '#/definitions/Route'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Route'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Route'
 */
/**
 * @swagger
 * /api/routes/{id}:
 *  delete:
 *      tags:
 *        - Routes
 *      summary: This api is used to delete route from database
 *      description: This api is used to delete one route from database
 *      parameters:
 *         - name: authorization
 *           in: header
 *           required: true
 *         - in: path
 *           name: id
 *           required: true
 *           description: Numeric ID required
 *           schema:
 *            type:integer
 *      responses:
 *          200:
 *              description: Route is deleted
 *
 */

route.post('/api/routes', verifyAdmnOperator, Routes.create)
route.get('/api/routes', Routes.listAll)
route.get('/api/routes/:id', Routes.list)
route.put('/api/routes/:id', verifyAdmnOperator, Routes.modify)
route.delete('/api/routes/:id', verifyAdmnOperator, Routes.delete)

export default route
